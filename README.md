# Artlist Labs - Face Change Batch Processor

A beautiful, modern web application for batch processing images using Fal's face change workflow. Upload 1-50+ images and process them all in parallel, with the ability to download results individually or all at once as a ZIP file.

## Features

✨ **Batch Processing** - Process 1-50+ images simultaneously
🎨 **Beautiful UI** - Artlist Labs design system with smooth animations
📤 **Drag & Drop** - Easy file upload with drag and drop support
⚡ **Parallel Processing** - All images processed concurrently for maximum speed
🔄 **Real-time Progress** - Live progress tracking for each image
📊 **Before/After Comparison** - View original and processed images side-by-side
💾 **Flexible Download** - Download individual images or all as ZIP
🎯 **Error Handling** - Clear error messages for failed processing

## Setup Instructions

### 1. Get Your Fal API Key

1. Sign up at [fal.ai](https://fal.ai)
2. Navigate to your dashboard
3. Generate an API key
4. Copy the key for the next step

### 2. Configure the Application

Open `index.html` and replace the placeholder with your actual Fal API key:

```javascript
fal.config({
    credentials: "YOUR_FAL_KEY_HERE" // Replace with your actual Fal API key
});
```

### 3. Run the Application

#### Option A: Local Development Server

Using Python:
```bash
python -m http.server 8000
```

Using Node.js (with http-server):
```bash
npx http-server -p 8000
```

Using PHP:
```bash
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

#### Option B: Deploy to Web

Upload all files to your web hosting service:
- `index.html`
- `style.css`

The application uses CDN-hosted libraries, so no additional build step is required.

## Usage Guide

### Step 1: Upload Images

1. **Click "Select Images"** or drag and drop images into the upload area
2. Supported formats: JPG, PNG, WebP
3. Upload anywhere from 1 to 50+ images

### Step 2: Review Selection

- Preview all selected images in a grid
- Remove individual images using the × button
- Clear all images with the "Clear All" button

### Step 3: Process Images

1. Click **"Process All"** to start batch processing
2. Watch real-time progress for each image:
   - Uploading...
   - Processing...
   - Complete ✓
3. View overall progress bar at the top

### Step 4: View Results

- **Grid View**: See all results in before/after comparison cards
- **Click any card** to open full comparison modal
- **Download options**:
  - Individual images: Click download button on each card
  - All images: Click "Download All as ZIP"

### Step 5: Process More

Click **"Process More"** to start over with new images

## Technical Details

### Fal Workflow

The application uses the following Fal workflow:
```javascript
fal.stream("workflows/Content-vlm7ci7l2p91/colby-change-subject-face", {
  input: {
    image_urls: [imageUrl]
  }
});
```

### Dependencies

All dependencies are loaded via CDN:
- **@fal-ai/client** - Fal API integration
- **JSZip** - Creating ZIP archives
- **FileSaver.js** - Downloading files

### Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Responsive design

## File Structure

```
├── index.html          # Main application file
├── style.css           # Artlist Labs styling
└── README.md          # This file
```

## Features Breakdown

### Upload System
- Drag and drop support
- Multiple file selection
- Image preview grid
- Individual file removal

### Processing Engine
- Parallel processing of all images
- Fal API integration
- Image upload to Fal storage
- Streaming workflow execution
- Error handling per image

### Results Display
- Before/after comparison cards
- Full-screen comparison modal
- Individual download buttons
- Batch ZIP download
- Processing status indicators

### UI/UX
- Artlist Labs design system
- Smooth animations
- Responsive layout (mobile-friendly)
- Loading indicators
- Progress tracking
- Error states

## Customization

### Changing the Workflow

To use a different Fal workflow, update this line in `index.html`:

```javascript
const stream = await fal.stream("workflows/YOUR-WORKFLOW-ID", {
  input: {
    // Your workflow parameters
  }
});
```

### Styling

All styles are in `style.css` following the Artlist Labs design system:
- Gold gradient (#FFD700 to #FFA500)
- Dark background (#0a0a0a)
- Glass-morphism effects
- Smooth transitions

## Troubleshooting

### Images not processing
- Check that your Fal API key is correctly configured
- Ensure you have sufficient credits in your Fal account
- Check browser console for error messages

### ZIP download not working
- Ensure all images have finished processing
- Check that JSZip and FileSaver libraries are loaded
- Try downloading individual images first

### Drag and drop not working
- Make sure you're dragging image files only
- Check browser compatibility
- Try using the file selector button instead

## Performance Tips

- For best performance, process 10-20 images at a time
- Larger batches (50+) may take longer but will process in parallel
- Optimize image sizes before upload for faster processing
- Use modern browsers for best performance

## Support

For issues related to:
- **Fal API**: Contact [Fal support](https://fal.ai/support)
- **This application**: Check browser console for errors

## License

This application is provided as-is for use with Fal workflows.

## Credits

- Design system inspired by Artlist Labs
- Powered by [Fal.ai](https://fal.ai)
- Uses JSZip and FileSaver.js libraries
