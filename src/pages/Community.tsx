import { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, Trophy, TrendingUp, Users } from 'lucide-react';
import Button from '../components/Button';

export default function Community() {
  const [activeFilter, setActiveFilter] = useState<'newest' | 'popular' | 'following'>('newest');

  const challenges = [
    {
      id: 1,
      title: 'Winter Movie Marathon',
      participants: 1234,
      daysLeft: 12,
      image: 'https://images.pexels.com/photos/3184192/pexels-photo-3184192.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 2,
      title: 'Dessert Cinema Week',
      participants: 892,
      daysLeft: 5,
      image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];

  const posts = [
    {
      id: 1,
      user: {
        name: 'Sarah Chen',
        username: '@sarahchef',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
      content: 'Just made the Ratatouille from the movie! Turned out amazing! The layering technique really makes a difference. Anyone else tried this? 🍆🥒🍅',
      image: 'https://images.pexels.com/photos/8753657/pexels-photo-8753657.jpeg?auto=compress&cs=tinysrgb&w=800',
      movie: 'Ratatouille',
      likes: 342,
      comments: 28,
      shares: 15,
      timestamp: '2 hours ago',
      liked: false,
      bookmarked: false,
    },
    {
      id: 2,
      user: {
        name: 'Marco Rodriguez',
        username: '@marco_cooks',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
      content: 'Recreated the iconic spaghetti scene from Lady and the Tramp for date night. Pro tip: candlelight makes everything taste better! 🍝❤️',
      image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800',
      movie: 'Lady and the Tramp',
      likes: 567,
      comments: 43,
      shares: 22,
      timestamp: '5 hours ago',
      liked: true,
      bookmarked: false,
    },
    {
      id: 3,
      user: {
        name: 'Emily Watson',
        username: '@emilybakes',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
      content: 'Challenge accepted! Made the entire Bruce Bogtrotter chocolate cake from Matilda. It\'s MASSIVE but so worth it. Who wants a slice?',
      image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=800',
      movie: 'Matilda',
      likes: 891,
      comments: 67,
      shares: 34,
      timestamp: '1 day ago',
      liked: false,
      bookmarked: true,
    },
  ];

  const trendingCreators = [
    {
      name: 'Chef Auguste',
      username: '@chef_auguste',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
      followers: 12453,
    },
    {
      name: 'Julia Masters',
      username: '@julia_masters',
      avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=200',
      followers: 8234,
    },
    {
      name: 'David Kim',
      username: '@davidcooks',
      avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=200',
      followers: 6789,
    },
  ];

  const toggleLike = (postId: number) => {
    console.log('Toggle like:', postId);
  };

  const toggleBookmark = (postId: number) => {
    console.log('Toggle bookmark:', postId);
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="section-title">Community Feed</h1>
          <p className="text-gray-400">Share your creations and connect with fellow food enthusiasts</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <main className="flex-1">
            <div className="bg-cinematic-gray rounded-xl border border-gray-800 p-6 mb-6">
              <div className="flex items-start space-x-4">
                <img
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200"
                  alt="Your avatar"
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <textarea
                    placeholder="Share your culinary creation..."
                    className="input-field min-h-[80px] resize-none mb-4"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-gray-400">
                      <button className="hover:text-cinematic-accent transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </button>
                      <button className="hover:text-cinematic-accent transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                        </svg>
                      </button>
                    </div>
                    <Button>Post</Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 mb-6 border-b border-gray-800">
              {(['newest', 'popular', 'following'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`py-4 px-2 font-medium transition-colors relative ${
                    activeFilter === filter
                      ? 'text-cinematic-accent'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  {activeFilter === filter && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cinematic-accent" />
                  )}
                </button>
              ))}
            </div>

            <div className="space-y-6">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="bg-cinematic-gray rounded-xl border border-gray-800 overflow-hidden hover:border-gray-700 transition-colors"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={post.user.avatar}
                          alt={post.user.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <h3 className="text-white font-semibold">{post.user.name}</h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-400">
                            <span>{post.user.username}</span>
                            <span>•</span>
                            <span>{post.timestamp}</span>
                          </div>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                    </div>

                    <p className="text-gray-300 mb-4">{post.content}</p>

                    {post.movie && (
                      <div className="inline-flex items-center space-x-1 bg-cinematic-gray-light px-3 py-1 rounded-lg text-sm text-cinematic-gold mb-4">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                        </svg>
                        <span>{post.movie}</span>
                      </div>
                    )}
                  </div>

                  {post.image && (
                    <img
                      src={post.image}
                      alt="Post content"
                      className="w-full object-cover max-h-96"
                    />
                  )}

                  <div className="p-6 border-t border-gray-800">
                    <div className="flex items-center justify-between text-gray-400 mb-4">
                      <span className="text-sm">{post.likes} likes</span>
                      <div className="flex items-center space-x-4 text-sm">
                        <span>{post.comments} comments</span>
                        <span>{post.shares} shares</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-800 pt-4">
                      <button
                        onClick={() => toggleLike(post.id)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                          post.liked
                            ? 'text-cinematic-accent bg-cinematic-accent/10'
                            : 'text-gray-400 hover:text-cinematic-accent hover:bg-cinematic-gray-light'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${post.liked ? 'fill-cinematic-accent' : ''}`} />
                        <span>Like</span>
                      </button>

                      <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-cinematic-gray-light transition-colors">
                        <MessageCircle className="w-5 h-5" />
                        <span>Comment</span>
                      </button>

                      <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-cinematic-gray-light transition-colors">
                        <Share2 className="w-5 h-5" />
                        <span>Share</span>
                      </button>

                      <button
                        onClick={() => toggleBookmark(post.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          post.bookmarked
                            ? 'text-cinematic-gold bg-cinematic-gold/10'
                            : 'text-gray-400 hover:text-cinematic-gold hover:bg-cinematic-gray-light'
                        }`}
                      >
                        <Bookmark className={`w-5 h-5 ${post.bookmarked ? 'fill-cinematic-gold' : ''}`} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </main>

          <aside className="lg:w-80 space-y-6">
            <div className="bg-cinematic-gray rounded-xl border border-gray-800 p-6 sticky top-24">
              <h3 className="text-white font-bold mb-4 flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-cinematic-gold" />
                Active Challenges
              </h3>
              <div className="space-y-4">
                {challenges.map((challenge) => (
                  <div key={challenge.id} className="group cursor-pointer">
                    <div className="relative rounded-lg overflow-hidden mb-2">
                      <img
                        src={challenge.image}
                        alt={challenge.title}
                        className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2">
                        <h4 className="text-white font-semibold text-sm">{challenge.title}</h4>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">{challenge.participants} joined</span>
                      <span className="text-cinematic-accent">{challenge.daysLeft}d left</span>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Challenges
              </Button>
            </div>

            <div className="bg-cinematic-gray rounded-xl border border-gray-800 p-6">
              <h3 className="text-white font-bold mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-cinematic-accent" />
                Trending Creators
              </h3>
              <div className="space-y-4">
                {trendingCreators.map((creator) => (
                  <div key={creator.username} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={creator.avatar}
                        alt={creator.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="text-white font-medium text-sm">{creator.name}</p>
                        <p className="text-gray-400 text-xs">{creator.followers.toLocaleString()} followers</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Follow
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-cinematic-gray rounded-xl border border-gray-800 p-6">
              <h3 className="text-white font-bold mb-4">Trending Hashtags</h3>
              <div className="flex flex-wrap gap-2">
                {['#RatatouilleChallenge', '#MovieFood', '#CinematicCooking', '#FoodieCinema', '#RecipeRecreation'].map((tag) => (
                  <button
                    key={tag}
                    className="px-3 py-1 bg-cinematic-gray-light text-cinematic-accent text-sm rounded-full hover:bg-cinematic-accent hover:text-white transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
