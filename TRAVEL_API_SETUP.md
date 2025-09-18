# Travel & Booking API Setup

This document explains how to set up the required API keys for the Hotels & Travel booking functionality.

## Required API Keys

### 1. OpenTripMap API (Free Tier)
- **Purpose**: Fetch nearby hotels, attractions, and POIs
- **Free Tier**: 1,000 requests per day
- **Sign up**: https://opentripmap.io/
- **Documentation**: https://opentripmap.io/docs

**Setup Steps:**
1. Visit https://opentripmap.io/
2. Click "Get API Key"
3. Sign up with your email
4. Copy your API key
5. Add to `.env.local`:
   ```
   NEXT_PUBLIC_OPENTRIPMAP_API_KEY=your_api_key_here
   ```

### 2. Amadeus API (Free Tier)
- **Purpose**: Flight and hotel search functionality
- **Free Tier**: 2,000 requests per month
- **Sign up**: https://developers.amadeus.com/
- **Documentation**: https://developers.amadeus.com/self-service

**Setup Steps:**
1. Visit https://developers.amadeus.com/
2. Click "Get Started" and create an account
3. Create a new app in the developer portal
4. Copy your API Key and API Secret
5. Add to `.env.local`:
   ```
   NEXT_PUBLIC_AMADEUS_API_KEY=your_api_key_here
   NEXT_PUBLIC_AMADEUS_API_SECRET=your_api_secret_here
   ```

### 3. Optional APIs

#### Mapbox (Enhanced Maps)
- **Purpose**: Better map tiles and features
- **Free Tier**: 50,000 map loads per month
- **Sign up**: https://www.mapbox.com/
- **Add to `.env.local`**:
  ```
  NEXT_PUBLIC_MAPBOX_API_KEY=your_mapbox_key_here
  ```

#### Google Maps (Geocoding)
- **Purpose**: Enhanced location search and geocoding
- **Free Tier**: $200 credit per month
- **Sign up**: https://console.cloud.google.com/
- **Add to `.env.local`**:
  ```
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key_here
  ```

## Environment Variables File

Create a `.env.local` file in your project root with the following structure:

```env
# Travel & Booking API Keys
NEXT_PUBLIC_OPENTRIPMAP_API_KEY=your_opentripmap_api_key_here
NEXT_PUBLIC_AMADEUS_API_KEY=your_amadeus_api_key_here
NEXT_PUBLIC_AMADEUS_API_SECRET=your_amadeus_api_secret_here

# Optional APIs
NEXT_PUBLIC_MAPBOX_API_KEY=your_mapbox_api_key_here
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

## Testing the APIs

1. **Start the development server**: `npm run dev`
2. **Navigate to**: http://localhost:3000/travel
3. **Test hotel search**: Enter a location in the search bar
4. **Test flight search**: Use the Flights tab to search for flights
5. **Check browser console**: Look for any API errors

## Fallback Behavior

The application includes mock data and will work without API keys, but with limited functionality:
- Hotel search will show sample data
- Flight search will show sample flights
- Map will display with basic OpenStreetMap tiles

## API Rate Limits

- **OpenTripMap**: 1,000 requests/day
- **Amadeus**: 2,000 requests/month
- **Mapbox**: 50,000 map loads/month
- **Google Maps**: $200 credit/month

## Troubleshooting

### Common Issues:

1. **"API key not found" errors**
   - Check that `.env.local` exists in project root
   - Verify API keys are correctly formatted
   - Restart the development server after adding keys

2. **CORS errors**
   - These APIs support CORS for web applications
   - If you see CORS errors, check your API key configuration

3. **Rate limit exceeded**
   - Check your API usage in the respective developer portals
   - Consider upgrading to paid tiers if needed

4. **Map not loading**
   - Ensure Leaflet CSS is loaded (handled automatically)
   - Check browser console for JavaScript errors

## Support

For API-specific issues:
- **OpenTripMap**: https://opentripmap.io/support
- **Amadeus**: https://developers.amadeus.com/support
- **Mapbox**: https://docs.mapbox.com/help/
- **Google Maps**: https://developers.google.com/maps/support

