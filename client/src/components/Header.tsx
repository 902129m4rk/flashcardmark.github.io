import { Link } from 'react-router-dom'
import './css/Header.css'
export function Header(){
    return <div className="Header">
        <div className="container">
            <div><a href="/">FlashCardsMark</a></div> 
            <div><a href="/">DECKS</a></div> 
            <div><a href="/login">LOGIN</a></div> 
        </div>
    </div>
    
}