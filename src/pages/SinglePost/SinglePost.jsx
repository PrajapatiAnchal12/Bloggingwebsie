import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import MainLayout from '../../layouts/MainLayout';
import NewsCard from '../../components/NewsCard/NewsCard';
import SmallListCard from '../../components/NewsCard/SmallListCard';
import { FaUser, FaClock, FaEye, FaComment, FaRss, FaFacebookF, FaTwitter, FaGooglePlusG, FaVimeoV, FaYoutube, FaChevronCircleRight, FaPinterestP, FaReply } from 'react-icons/fa';
import '../../components/TechnologyNews/technology-news.css'; // For section-header-block
import '../../components/MoreNews/more-news.css'; // For newsletter
import './singlepost.css';

const SinglePost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const [popularNews, setPopularNews] = useState([]);
    const [relatedPosts, setRelatedPosts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchPostAndSidebar = async () => {
            try {
                setLoading(true);
                // 1. Fetch Current Post
                const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
                setPost(res.data);

                // 2. Fetch Related Posts (same category)
                const relatedRes = await axios.get(`http://localhost:5000/api/posts?category=${res.data.category}`);
                setRelatedPosts(relatedRes.data.filter(p => p._id !== id).slice(0, 4));

                // 3. Fetch Popular News for Sidebar
                const popularRes = await axios.get('http://localhost:5000/api/posts?sort=popular');
                setPopularNews(popularRes.data.slice(0, 4));

                // 4. Fetch Categories
                const catRes = await axios.get('http://localhost:5000/api/categories');
                setCategories(catRes.data);

            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPostAndSidebar();
    }, [id]); 

    if (loading) return <MainLayout><div className="container" style={{padding: '100px 0', textAlign: 'center'}}><h2>Loading...</h2></div></MainLayout>;
    if (!post) return <MainLayout><div className="container" style={{padding: '100px 0', textAlign: 'center'}}><h2>Post Not Found</h2></div></MainLayout>;
    
    // Format Date
    const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });

    return (
        <MainLayout>
            <div className="container" style={{ paddingTop: '30px' }}>
                {/* BREADCRUMB - FULL WIDTH */}
                <div className="sp-breadcrumb">
                    <Link to="/" style={{color:'red', fontWeight:600, textDecoration:'none'}}>Home</Link> <span style={{color:'#999', margin:'0 6px'}}>&gt;</span> <span style={{color:'#888', textTransform: 'uppercase'}}>{post.category}</span>
                </div>
            </div>

            <div className="container home-content-area single-post-container">
                
                {/* LEFT MAIN COLUMN */}
                <div className="home-main-col">

                    {/* POST HEADER */}
                    <div className="sp-header">
                        <span className="sp-category" style={{ backgroundColor: 'red', textTransform: 'uppercase' }}>{post.category}</span>
                        <h1 className="sp-title">{post.title}</h1>
                        <div className="sp-meta">
                            <span>By {post.author}</span>
                            <span><FaClock /> {formattedDate}</span>
                            <span><FaEye /> {post.views}</span>
                            <span><FaComment /> {post.commentsCount < 10 ? `0${post.commentsCount}` : post.commentsCount}</span>
                        </div>
                    </div>

                    {/* POST IMAGE */}
                    <div className="sp-image-container">
                        <img src={post.image} alt={post.title} />
                    </div>

                    {/* POST CONTENT */}
                    {/* COMPLEX SPLIT CONTENT */}
                    {(() => {
                        const content = post.content || "";
                        // Find index after 1st paragraph
                        const firstSplit = content.indexOf('</p>');
                        // Find index after 2nd paragraph
                        const secondSplit = content.indexOf('</p>', firstSplit + 4);
                        
                        let part1 = content;
                        let part2 = "";
                        let part3 = "";
                        
                        if (firstSplit !== -1) {
                            part1 = content.substring(0, firstSplit + 4);
                            if (secondSplit !== -1) {
                                part2 = content.substring(firstSplit + 4, secondSplit + 4);
                                part3 = content.substring(secondSplit + 4);
                            } else {
                                part2 = content.substring(firstSplit + 4);
                            }
                        }

                        return (
                            <>
                                {/* PART 1 */}
                                <div className="sp-body" dangerouslySetInnerHTML={{ __html: part1 }}></div>
                                
                                {/* QUOTE */}
                                {post.quote && (
                                    <blockquote className="sp-body-quote">
                                        <p>{post.quote}</p>
                                    </blockquote>
                                )}

                                {/* PART 2 (Next ~5 lines) */}
                                {part2 && <div className="sp-body" dangerouslySetInnerHTML={{ __html: part2 }}></div>}

                                {/* BULLET POINTS */}
                                {post.points && post.points.length > 0 && (
                                    <ul className="sp-body-list">
                                        {post.points.map((point, idx) => (
                                            <li key={idx}>{point}</li>
                                        ))}
                                    </ul>
                                )}

                                {/* PART 3 (Rest of content) */}
                                {part3 && <div className="sp-body" dangerouslySetInnerHTML={{ __html: part3 }}></div>}
                            </>
                        );
                    })()}

                    {/* POST TAGS (Showing All Categories as Hashtags) */}
                    <div className="sp-tags-row">
                        <span className="tags-label">TAGS:</span>
                        {categories.map(cat => (
                            <Link key={cat._id} to={`/category/${cat.name}`}># {cat.name.toUpperCase()}</Link>
                        ))}
                    </div>

                    {/* SOCIAL SHARE */}
                    <div className="sp-social-share">
                        <Link to="#" className="share-btn fb"><FaFacebookF /> FACEBOOK</Link>
                        <Link to="#" className="share-btn tw"><FaTwitter /> TWITTER</Link>
                        <Link to="#" className="share-btn gp"><FaGooglePlusG /> GOOGLE +</Link>
                        <Link to="#" className="share-btn pt"><FaPinterestP /> PINTEREST</Link>
                    </div>

                    {/* PREV / NEXT NAV */}
                    <div className="sp-post-nav">
                        <Link to="#" className="nav-prev">
                            <span className="nav-label">&lt; Previous Post</span>
                            <h4 className="nav-title">Zhang social media pop also known when smart innocent...</h4>
                        </Link>
                        <div className="nav-divider"></div>
                        <Link to="#" className="nav-next">
                            <span className="nav-label">Next Post &gt;</span>
                            <h4 className="nav-title">Zhang social media pop also known when smart innocent...</h4>
                        </Link>
                    </div>

                    {/* AUTHOR BIO */}
                    <div className="sp-author-bio">
                        <div className="author-img">
                            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80" alt="Miss Lisa Doe" />
                        </div>
                        <div className="author-info">
                            <h3>Miss Lisa Doe</h3>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since It has survived not only five centuries, but also the leap into electronic type setting, remaining essentially unchanged.</p>
                        </div>
                    </div>

                    {/* NEW: RELATED POSTS */}
                    <div className="section-header-block black-theme related-posts-header">
                        <span className="sh-title">RELATED POSTS</span>
                        <div className="sh-line"></div>
                        <div className="rp-controls">
                            <button className="rp-btn">&lt;</button>
                            <button className="rp-btn">&gt;</button>
                        </div>
                    </div>
                    <div className="related-posts-grid">
                        {relatedPosts.map(post => (
                            <NewsCard key={post._id} post={post} />
                        ))}
                    </div>

                    {/* NEW: 03 COMMENTS */}
                    <div className="section-header-block black-theme">
                        <span className="sh-title">03 COMMENTS</span>
                        <div className="sh-line"></div>
                    </div>
                    
                    {/* COMMENTS LIST */}
                    <div className="sp-comments-list">
                        
                        {/* Comment 1 */}
                        <div className="sp-comment-item">
                            <div className="sp-comment-avatar">
                                <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80" alt="User 1" />
                            </div>
                            <div className="sp-comment-content">
                                <div className="sp-comment-header">
                                    <h4>Miss Lisa Doe</h4>
                                    <span className="sp-comment-date">15 Jan, 2022</span>
                                </div>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since It has survived not only five centuries, but also the leap into electronic type setting, remaining essentially unchanged.</p>
                                <button className="reply-btn"><FaReply /> REPLY</button>
                            </div>
                        </div>

                        {/* Comment 2 (Reply) */}
                        <div className="sp-comment-item reply">
                            <div className="sp-comment-avatar">
                                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80" alt="User 2" />
                            </div>
                            <div className="sp-comment-content">
                                <div className="sp-comment-header">
                                    <h4>Miss Lisa Doe</h4>
                                    <span className="sp-comment-date">15 Jan, 2022</span>
                                </div>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since It has survived not only five centuries, but also the leap into electronic type setting, remaining essentially unchanged.</p>
                                <button className="reply-btn"><FaReply /> REPLY</button>
                            </div>
                        </div>

                    </div>

                    {/* NEW: LEAVE A COMMENT */}
                    <div className="leave-comment-section">
                        <div className="leave-comment-header">
                            <h3>Leave a comment</h3>
                            <div className="lc-line"></div>
                        </div>
                        <form className="comment-form" onSubmit={(e) => { e.preventDefault(); alert("Comment Post Submitted!"); }}>
                            <div className="input-group">
                                <input type="text" placeholder="Name" required />
                            </div>
                            <div className="input-group">
                                <input type="email" placeholder="Email" required />
                            </div>
                            <div className="input-group">
                                <input type="text" placeholder="Phone" />
                            </div>
                            <div className="input-group">
                                <input type="text" placeholder="Subject" />
                            </div>
                            <div className="input-group full">
                                <textarea placeholder="Comment" required></textarea>
                            </div>
                            <button type="submit">POST COMMENT</button>
                        </form>
                    </div>

                </div>

                {/* RIGHT SIDEBAR COLUMN */}
                <div className="home-sidebar-col">
                    
                    {/* FOLLOW US */}
                    <div className="section-header-block black-theme">
                        <span className="sh-title">FOLLOW US</span>
                        <div className="sh-line"></div>
                    </div>
                    <div className="follow-us-icons">
                        <a href="#" style={{background: '#ff9900'}}><FaRss /></a>
                        <a href="#" style={{background: '#3b5998'}}><FaFacebookF /></a>
                        <a href="#" style={{background: '#00aced'}}><FaTwitter /></a>
                        <a href="#" style={{background: '#dd4b39'}}><FaGooglePlusG /></a>
                        <a href="#" style={{background: '#aad450'}}><FaVimeoV /></a>
                        <a href="#" style={{background: '#bb0000'}}><FaYoutube /></a>
                    </div>

                    {/* POPULAR NEWS */}
                    <div className="section-header-block black-theme">
                        <span className="sh-title">POPULAR NEWS</span>
                        <div className="sh-line"></div>
                    </div>
                    <div className="popular-news-list" style={{ marginBottom: '40px' }}>
                        {popularNews.map(news => (
                            <SmallListCard key={news._id} post={news} />
                        ))}
                    </div>

                    {/* POPULAR CATEGORIES */}
                    <div className="section-header-block black-theme">
                        <span className="sh-title">CATEGORIES</span>
                        <div className="sh-line"></div>
                    </div>
                    <div className="popular-tags-list">
                        {categories.map(cat => (
                            <Link key={cat._id} to={`/category/${cat.name}`}>{cat.name.toUpperCase()}</Link>
                        ))}
                    </div>


                    {/* NEWSLETTER */}
                    <div className="section-header-block black-theme">
                        <span className="sh-title">NEWSLETTER</span>
                        <div className="sh-line"></div>
                    </div>
                    <div className="newsletter-box">
                        <h3 className="nl-title">Subscribe Newsletter!</h3>
                        <div className="nl-div-line"></div>
                        <p className="nl-text">Lorem ipsum dolor sit consectetur adipiscing elit Maecenas in pulvinar neque Nulla finibus lobortis pulvinar.</p>
                        <form className="nl-form" onSubmit={(e) => { e.preventDefault(); alert("Thanks for subscribing!"); }}>
                            <input type="email" placeholder="E-Mail Address" required />
                            <button type="submit">SUBSCRIBE</button>
                        </form>
                    </div>

                </div>
            </div>
        </MainLayout>
    );
};

export default SinglePost;
