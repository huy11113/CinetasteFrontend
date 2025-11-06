// src/pages/EditProfile.tsx
import { useState } from 'react';
import { Camera, User, MapPin, Link as LinkIcon, Save, X } from 'lucide-react';
import Button from '../components/Button';
import ThemeSwitcher from '../components/ThemeSwitcher'; // THÊM MỚI

export default function EditProfile() {
  const [formData, setFormData] = useState({
    name: 'Chef Auguste',
    username: 'chef_auguste',
    bio: 'Passionate about recreating iconic movie dishes. Master chef and cinema enthusiast. Sharing culinary stories one recipe at a time.',
    location: 'Paris, France',
    website: 'https://chefauguste.com',
  });

  const [avatarPreview, setAvatarPreview] = useState('https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400');
  const [bannerPreview, setBannerPreview] = useState('https://images.pexels.com/photos/3184192/pexels-photo-3184192.jpeg?auto=compress&cs=tinysrgb&w=1920');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile updated:', formData);
  };

  const handleImageUpload = (type: 'avatar' | 'banner') => {
    console.log(`Upload ${type}`);
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold text-white mb-2">Edit Profile</h1>
          <p className="text-gray-400">Update your profile information and preferences</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-cinematic-gray rounded-xl border border-gray-800 overflow-hidden">
            <div className="relative h-48 group">
              <img
                src={bannerPreview}
                alt="Banner"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => handleImageUpload('banner')}
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Change Banner
                </Button>
              </div>
            </div>

            <div className="relative px-8 pb-8">
              <div className="relative -mt-20 mb-6 w-40 h-40 group">
                <img
                  src={avatarPreview}
                  alt="Avatar"
                  className="w-full h-full rounded-full border-4 border-cinematic-gray object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleImageUpload('avatar')}
                  className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                >
                  <Camera className="w-8 h-8 text-white" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <User className="w-4 h-4 inline mr-1" />
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="input-field"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Username
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">@</span>
                      <input
                        type="text"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        className="input-field pl-8"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Bio
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="input-field min-h-[120px] resize-none"
                    placeholder="Tell us about yourself..."
                    maxLength={200}
                  />
                  <p className="text-sm text-gray-500 mt-1 text-right">
                    {formData.bio.length}/200 characters
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      Location
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="input-field"
                      placeholder="City, Country"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <LinkIcon className="w-4 h-4 inline mr-1" />
                      Website
                    </label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="input-field"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* THÊM MỚI: Theme Switcher */}
          <ThemeSwitcher />

          <div className="bg-cinematic-gray rounded-xl border border-gray-800 p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Taste Preferences</h3>
            <p className="text-gray-400 text-sm mb-4">
              Help us recommend recipes that match your preferences
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Dietary Restrictions
                </label>
                <div className="flex flex-wrap gap-3">
                  {['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut-Free'].map((diet) => (
                    <label
                      key={diet}
                      className="flex items-center px-4 py-2 bg-cinematic-gray-light rounded-lg cursor-pointer hover:bg-cinematic-gray border border-gray-700 hover:border-cinematic-accent transition-colors"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded bg-cinematic-gray-light border-gray-600 text-cinematic-accent focus:ring-cinematic-accent mr-2"
                      />
                      <span className="text-sm text-gray-300">{diet}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Favorite Cuisines
                </label>
                <div className="flex flex-wrap gap-3">
                  {['Italian', 'French', 'Japanese', 'Mexican', 'Indian', 'Chinese'].map((cuisine) => (
                    <label
                      key={cuisine}
                      className="flex items-center px-4 py-2 bg-cinematic-gray-light rounded-lg cursor-pointer hover:bg-cinematic-gray border border-gray-700 hover:border-cinematic-accent transition-colors"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded bg-cinematic-gray-light border-gray-600 text-cinematic-accent focus:ring-cinematic-accent mr-2"
                      />
                      <span className="text-sm text-gray-300">{cuisine}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-cinematic-gray rounded-xl border border-gray-800 p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Privacy Settings</h3>

            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <p className="text-white font-medium">Public Profile</p>
                  <p className="text-sm text-gray-400">Allow others to view your profile</p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-12 h-6 rounded-full bg-cinematic-gray-light border-gray-600 text-cinematic-accent focus:ring-cinematic-accent"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <p className="text-white font-medium">Show Email</p>
                  <p className="text-sm text-gray-400">Display your email on your profile</p>
                </div>
                <input
                  type="checkbox"
                  className="w-12 h-6 rounded-full bg-cinematic-gray-light border-gray-600 text-cinematic-accent focus:ring-cinematic-accent"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <p className="text-white font-medium">Recipe Notifications</p>
                  <p className="text-sm text-gray-400">Get notified about new recipes and comments</p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-12 h-6 rounded-full bg-cinematic-gray-light border-gray-600 text-cinematic-accent focus:ring-cinematic-accent"
                />
              </label>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4">
            <a href="/profile">
              <Button variant="secondary" type="button">
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </a>
            <Button type="submit">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}