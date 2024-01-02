import {Component} from 'react'
import './App.css';

class App extends Component{
  state = {

    posts: []
  }
  timeoutUpdate = null 

  componentDidMount(){
    this.loadPosts()
  }
  
  loadPosts = async () =>{
    
    const postResponse = fetch('https://jsonplaceholder.typicode.com/posts') /*aqui eu faço o requerimento dos dados */
    const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos') /*aqui eu faço o requerimento dos dados */
    
    const [photos, posts] = await Promise.all([photosResponse, postResponse ]) /*aqui crio um array com os dados */
    
    const postsJson = await posts.json() /*aqui eu converto para json os dados requeridos */
    const photosJson = await photos.json() /*aqui eu converto para json os dados requeridos */

    const photosAndPosts = postsJson.map((post, index) =>{
      return {...post, cover: photosJson[index].url }
    })/*aqui eu crio um novo array com o método map */

    this.setState({ posts: photosAndPosts })
  }

  render(){
    const {posts} = this.state

    return(
      <section className='container'>

      <div className='posts'>
        {posts.map((post) => (
          <div className='post'>
            <img src={post.cover} alt={post.title} />
            <div key={post.id} className='post-card'>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
          </div> 
          </div>
        
        ))}
      </div>
      </section>
    )
  }
}
export default App;
