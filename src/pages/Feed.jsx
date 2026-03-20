import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Feed.css'

function Feed() {
  const navigate = useNavigate()
  const [likes, setLikes] = useState({})

  const feedPosts = [
    {
      id: 1,
      author: 'Security Team',
      avatar: '',
      timestamp: '2 hours ago',
      title: 'JWT Protection',
      content:
        'Implementing JWT tokens ensures that your authentication is stateless and secure. Every request carries cryptographically signed proof of identity.',
    },
    {
      id: 2,
      author: 'Tech Insights',
      avatar: '',
      timestamp: '4 hours ago',
      title: 'RESTful API Security',
      content:
        'Our Spring Boot backend validates every incoming request with JWT tokens. This prevents unauthorized access and protects sensitive user data from malicious actors.',
    },
    {
      id: 3,
      author: 'DevOps Daily',
      avatar: '',
      timestamp: '6 hours ago',
      title: 'Full-Stack Authentication',
      content:
        'Building a complete authentication system requires both frontend and backend coordination. React handles the UI while Spring Boot manages token validation securely.',
    },
    {
      id: 4,
      author: 'Security Corner',
      avatar: '',
      timestamp: '8 hours ago',
      title: 'Data Protection Best Practices',
      content:
        'Never store sensitive information in plain text. Always use HTTPS, validate tokens, and implement proper logout mechanisms to protect user sessions.',
    },
    {
      id: 5,
      author: 'Code Mastery',
      avatar: '',
      timestamp: '10 hours ago',
      title: 'React Router Integration',
      content:
        'Using react-router-dom for navigation with protected routes ensures that only authenticated users can access sensitive pages in your application.',
    },
  ]

  const handleProfileClick = () => {
    navigate('/profile')
  }

  const toggleLike = (postId) => {
    setLikes((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }))
  }

  return (
    <div className="feed-container">
      <div className="feed-navbar">
        <div className="navbar-content">
          <div className="logo">
            <span className="logo-text">Authentication System</span>
          </div>
          <button onClick={handleProfileClick} className="profile-btn">
            Profile
          </button>
        </div>
      </div>

      <div className="feed-wrapper">
        <div className="feed-posts-container">
          {feedPosts.map((post) => (
            <div key={post.id} className="feed-post">
              <div className="post-header">
                <div className="post-author-info">
                  <div className="post-avatar">{post.avatar}</div>
                  <div className="post-meta">
                    <div className="post-author">{post.author}</div>
                    <div className="post-timestamp">{post.timestamp}</div>
                  </div>
                </div>
              </div>

              <div className="post-body">
                <h3 className="post-title">{post.title}</h3>
                <p className="post-content">{post.content}</p>
              </div>

              <div className="post-actions">
                <button
                  className={`action-btn like-btn ${
                    likes[post.id] ? 'liked' : ''
                  }`}
                  onClick={() => toggleLike(post.id)}
                >
                  <span className="action-icon">
                    {likes[post.id] ? '❤️' : '🤍'}
                  </span>
                  <span className="action-text">Like</span>
                </button>
                <button className="action-btn comment-btn">
                  <span className="action-text">Comment</span>
                </button>
                <button className="action-btn share-btn">
                  <span className="action-text">Share</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Feed
