import { useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Subscribe({ flash }: { flash?: { success?: string; error?: string } }) {
    const [showSuccess, setShowSuccess] = useState(false);

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        email: '',
        phone: '',
        communication_frequency: '',
        discovery_source: '',
        discovery_source_other: '',
        preferred_platform: '',
        satisfaction_rating: '',
        content_preferences: [],
        content_preferences_other: '',
        would_share: '',
        consent_agreed: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox' && name === 'content_preferences') {
            setData(name, checked
                ? [...data.content_preferences, value]
                : data.content_preferences.filter(item => item !== value)
            );
        } else if (type === 'checkbox') {
            setData(name, checked);
        } else {
            setData(name, value);
        }

        // Clear error for this field when user starts typing
        if (errors[name]) {
            clearErrors(name);
        }
    };

    const submit = (e) => {
        e.preventDefault();

        post('/subscribe', {
            preserveScroll: true,
            onSuccess: () => {
                setShowSuccess(true);
                reset();

                // Hide success message after 5 seconds
                setTimeout(() => {
                    setShowSuccess(false);
                }, 5000);
            },
            onError: () => {
                setShowSuccess(false);
            }
        });
    };

    return (
        <div className="min-h-screen bg-black py-12">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold mb-2 text-gray-700">Subscribe to GGR</h1>
                    <p className="text-gray-600 mb-6">
                        Sign up to receive exclusive alerts and help us shape what comes next!
                    </p>
                    <p className="text-sm text-gray-500 mb-6">* Indicates required question</p>

                    {/* Success Message */}
                    {(showSuccess || flash?.success) && (
                        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                            {flash?.success || 'Thank you for subscribing! You will receive updates based on your preferences.'}
                        </div>
                    )}

                    {/* Error Message */}
                    {flash?.error && (
                        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                            {flash.error}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.email ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="your.email@example.com"
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Mobile Phone Number for Text Alerts <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={data.phone}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.phone ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="(555) 123-4567"
                            />
                            {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                        </div>

                        {/* Communication Frequency */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Preferred Communication Frequency for Text Alerts <span className="text-red-500">*</span>
                            </label>
                            <div className="space-y-2 text-gray-500">
                                <label className="flex items-start">
                                    <input
                                        type="radio"
                                        name="communication_frequency"
                                        value="weekly"
                                        checked={data.communication_frequency === 'weekly'}
                                        onChange={handleChange}
                                        className="mt-1 mr-3"
                                    />
                                    <span>Weekly Updates (Highlights and upcoming events)</span>
                                </label>
                                <label className="flex items-start">
                                    <input
                                        type="radio"
                                        name="communication_frequency"
                                        value="biweekly"
                                        checked={data.communication_frequency === 'biweekly'}
                                        onChange={handleChange}
                                        className="mt-1 mr-3"
                                    />
                                    <span>Bi-weekly Updates (Less frequent, major announcements only)</span>
                                </label>
                                <label className="flex items-start">
                                    <input
                                        type="radio"
                                        name="communication_frequency"
                                        value="urgent_only"
                                        checked={data.communication_frequency === 'urgent_only'}
                                        onChange={handleChange}
                                        className="mt-1 mr-3"
                                    />
                                    <span>Only for Urgent News/Special Offers (Very infrequent)</span>
                                </label>
                            </div>
                            {errors.communication_frequency && (
                                <p className="mt-1 text-sm text-red-500">{errors.communication_frequency}</p>
                            )}
                        </div>

                        {/* Discovery Source */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Where did you FIRST discover GGR Music Group? <span className="text-red-500">*</span>
                            </label>
                            <div className="space-y-2 text-gray-500">
                                {['Instagram', 'YouTube', 'Live event / performance', 'Friend or word of mouth', 'Search (Google, etc.)'].map(option => (
                                    <label key={option} className="flex items-center">
                                        <input
                                            type="radio"
                                            name="discovery_source"
                                            value={option.toLowerCase().replace(/[\s/()]/g, '_')}
                                            checked={data.discovery_source === option.toLowerCase().replace(/[\s/()]/g, '_')}
                                            onChange={handleChange}
                                            className="mr-3"
                                        />
                                        <span>{option}</span>
                                    </label>
                                ))}
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="discovery_source"
                                        value="other"
                                        checked={data.discovery_source === 'other'}
                                        onChange={handleChange}
                                        className="mr-3"
                                    />
                                    <span>Other:</span>
                                </label>
                                {data.discovery_source === 'other' && (
                                    <input
                                        type="text"
                                        name="discovery_source_other"
                                        value={data.discovery_source_other}
                                        onChange={handleChange}
                                        className="ml-8 w-full px-4 py-2 border border-gray-300 rounded-lg"
                                        placeholder="Please specify"
                                    />
                                )}
                            </div>
                            {errors.discovery_source && (
                                <p className="mt-1 text-sm text-red-500">{errors.discovery_source}</p>
                            )}
                        </div>

                        {/* Preferred Platform */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Where would you MOST like to see more GGR content in the future? <span className="text-red-500">*</span>
                            </label>
                            <div className="space-y-2 text-gray-500">
                                {['Instagram', 'TikTok', 'YouTube', 'Facebook', 'X (Formally Twitter)', 'Short-form video (Reels / TikTok / Shorts)', 'Long-form video (YouTube)', 'Live Streams'].map(option => (
                                    <label key={option} className="flex items-center">
                                        <input
                                            type="radio"
                                            name="preferred_platform"
                                            value={option.toLowerCase().replace(/[\s/()]/g, '_')}
                                            checked={data.preferred_platform === option.toLowerCase().replace(/[\s/()]/g, '_')}
                                            onChange={handleChange}
                                            className="mr-3"
                                        />
                                        <span>{option}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.preferred_platform && (
                                <p className="mt-1 text-sm text-red-500">{errors.preferred_platform}</p>
                            )}
                        </div>

                        {/* Satisfaction Rating */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                How satisfied are you with the content we currently share on social media? <span className="text-red-500">*</span>
                            </label>
                            <p className="text-sm text-gray-500 mb-3">1 = Very Dissatisfied · 3 = Neutral · 5 = Very Satisfied</p>
                            <div className="flex items-center space-x-2 text-gray-500">
                                <span className="text-sm">Very Dissatisfied</span>
                                {[1, 2, 3, 4, 5].map(rating => (
                                    <label key={rating} className="flex flex-col items-center">
                                        <span className="text-sm mb-1">{rating}</span>
                                        <input
                                            type="radio"
                                            name="satisfaction_rating"
                                            value={rating}
                                            checked={data.satisfaction_rating === String(rating)}
                                            onChange={handleChange}
                                            className="w-5 h-5"
                                        />
                                    </label>
                                ))}
                                <span className="text-sm">Very Satisfied</span>
                            </div>
                            {errors.satisfaction_rating && (
                                <p className="mt-1 text-sm text-red-500">{errors.satisfaction_rating}</p>
                            )}
                        </div>

                        {/* Content Preferences */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                What kind of content would you like to see more of on our social media channels? <span className="text-red-500">*</span>
                            </label>
                            <div className="space-y-2 text-gray-500">
                                {[
                                    'Behind-the-scenes footage',
                                    'Exclusive interviews with talent',
                                    'Giveaways and contests',
                                    'Event highlights and recaps',
                                    'Upcoming schedule previews',
                                    'Fan spotlights and interactions'
                                ].map(option => (
                                    <label key={option} className="flex items-start">
                                        <input
                                            type="checkbox"
                                            name="content_preferences"
                                            value={option.toLowerCase().replace(/[\s-]/g, '_')}
                                            checked={data.content_preferences.includes(option.toLowerCase().replace(/[\s-]/g, '_'))}
                                            onChange={handleChange}
                                            className="mt-1 mr-3"
                                        />
                                        <span>{option}</span>
                                    </label>
                                ))}
                                <label className="flex items-start">
                                    <input
                                        type="checkbox"
                                        name="content_preferences"
                                        value="other"
                                        checked={data.content_preferences.includes('other')}
                                        onChange={handleChange}
                                        className="mt-1 mr-3"
                                    />
                                    <span>Other:</span>
                                </label>
                                {data.content_preferences.includes('other') && (
                                    <input
                                        type="text"
                                        name="content_preferences_other"
                                        value={data.content_preferences_other}
                                        onChange={handleChange}
                                        className="ml-8 w-full px-4 py-2 border border-gray-300 rounded-lg"
                                        placeholder="Please specify"
                                    />
                                )}
                            </div>
                            {errors.content_preferences && (
                                <p className="mt-1 text-sm text-red-500">{errors.content_preferences}</p>
                            )}
                        </div>

                        {/* Would Share */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Would you share GGR content with friends if it appeared on your preferred platform? <span className="text-red-500">*</span>
                            </label>
                            <div className="space-y-2 text-gray-500">
                                {['Yes', 'Maybe', 'No'].map(option => (
                                    <label key={option} className="flex items-center">
                                        <input
                                            type="radio"
                                            name="would_share"
                                            value={option.toLowerCase()}
                                            checked={data.would_share === option.toLowerCase()}
                                            onChange={handleChange}
                                            className="mr-3"
                                        />
                                        <span>{option}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.would_share && (
                                <p className="mt-1 text-sm text-red-500">{errors.would_share}</p>
                            )}
                        </div>

                        {/* Consent Disclaimer */}
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                            <h3 className="text-lg text-gray-700 font-semibold mb-3">Text Message & Privacy Consent Disclaimer</h3>
                            <div className="text-sm text-gray-700 space-y-2 mb-4">
                                <p>
                                    By submitting this form, you consent to receive email and/or SMS text messages from GGR Music Group related to updates, promotions, events, and announcements based on your selected preferences.
                                </p>
                                <p>
                                    Message frequency may vary. Standard message and data rates may apply. You may opt out of SMS communications at any time by replying STOP to any text message. For help, reply HELP or contact us at <a href="mailto:info@ggrmusic.com" className="text-blue-600 underline">info@ggrmusic.com</a>.
                                </p>
                                <p>
                                    Your personal information will be used solely for communication purposes and will not be sold or shared with third parties except as required to deliver messaging services or comply with applicable laws.
                                </p>
                                <p>
                                    By submitting this form, you confirm that you are at least 18 years old and agree to these terms.
                                </p>
                            </div>
                            <label className="flex items-start">
                                <input
                                    type="checkbox"
                                    name="consent_agreed"
                                    checked={data.consent_agreed}
                                    onChange={handleChange}
                                    className={`mt-1 mr-3 ${errors.consent_agreed ? 'border-red-500' : ''}`}
                                />
                                <span className="text-sm font-medium text-gray-500">
                                    I understand and agree to the disclaimer. <span className="text-red-500">*</span>
                                </span>
                            </label>
                            {errors.consent_agreed && (
                                <p className="mt-1 text-sm text-red-500">{errors.consent_agreed}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                disabled={processing}
                                className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-colors ${processing
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300'
                                    }`}
                            >
                                {processing ? 'Submitting...' : 'Submit'}
                            </button>
                        </div>

                        <p className="text-xs text-gray-500 text-center">
                            Never submit passwords through this form.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}