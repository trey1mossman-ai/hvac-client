/* ===================================
   SupplySide Flooring - Testimonials & Images Update Script
   This script adds testimonials section to all service pages
   and updates image placeholders with descriptive labels
   =================================== */

// Testimonials data
const testimonials = [
    {
        text: "We use SupplySide for residential and commercial flooring installations at our Chicago properties. They are always professional, reliable, transparent, and very fairly priced. Matt and Don operate at the highest level.",
        author: "Ziggy Durda",
        title: "Property Manager, Refined Realty",
        rating: 5
    },
    {
        text: "I work with flooring installers across Chicago almost every day, and SupplySide is consistently the most professional that we deal with. Their pricing is very fair, and they do great work, job after job.",
        author: "Rebecca Maxwell", 
        title: "Owner, TR Contracting",
        rating: 5
    },
    {
        text: "I hired SupplySide to re-tile our shower as we prepared the house to go on the market. Don did fantastic work. He helped us conceptualize the design from the beginning, and did a beautiful job executing on the design! My husband and I are very pleased, and highly recommend SupplySide for any tilework.",
        author: "Pam Williams",
        title: "Homeowner",
        rating: 5
    }
];

// HTML template for testimonials section
const testimonialsHTML = `
<!-- Testimonials Section -->
<section class="testimonials-section" style="background-color: #F5F1EC; padding: 80px 0;">
    <div class="container">
        <div class="section-header" style="text-align: center; margin-bottom: 60px;">
            <h2 style="font-size: 2.5rem; font-weight: 800; color: #1C1F2A; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 20px;">WHAT OUR CLIENTS SAY</h2>
            <p style="font-size: 1.25rem; color: #5E5E5E;">Real reviews from Chicago homeowners and property managers</p>
        </div>
        
        <div class="testimonial-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 30px; max-width: 1200px; margin: 0 auto;">
            ${testimonials.map(testimonial => `
                <div class="testimonial-card" style="background: #FFFFFF; padding: 40px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1); position: relative;">
                    <div style="position: absolute; top: 20px; left: 30px; font-size: 4rem; color: #7A9D54; opacity: 0.3; font-weight: 700; line-height: 1;">"</div>
                    
                    <div class="testimonial-rating" style="display: flex; gap: 4px; margin-bottom: 20px;">
                        ${Array(testimonial.rating).fill('').map(() => 
                            '<svg width="20" height="20" viewBox="0 0 24 24" fill="#FFD700"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>'
                        ).join('')}
                    </div>
                    
                    <p style="font-size: 1.1rem; line-height: 1.8; color: #5E5E5E; margin-bottom: 25px; font-style: italic;">
                        ${testimonial.text}
                    </p>
                    
                    <div class="testimonial-author">
                        <div style="font-weight: 700; color: #1C1F2A; font-size: 1.1rem;">${testimonial.author}</div>
                        <div style="color: #858585; font-size: 0.95rem;">${testimonial.title}</div>
                    </div>
                </div>
            `).join('')}
        </div>
    </div>
</section>
`;

// Service-specific image descriptions
const serviceImages = {
    'vinyl': {
        hero: 'High-quality photo of luxury vinyl plank flooring in a modern Chicago living room with natural lighting',
        gallery: [
            'Waterproof vinyl plank in Lincoln Park condo living room with lake views',
            'Luxury vinyl tile in Wicker Park kitchen with stone-look pattern',
            'Commercial-grade vinyl in Loop office building lobby',
            'Moisture-resistant vinyl plank in Oak Park basement recreation room',
            'Pet-friendly vinyl flooring in Logan Square home with dogs',
            'Vinyl plank installation process showing click-lock system'
        ]
    },
    'laminate': {
        hero: 'Beautiful laminate flooring in Chicago suburban home with warm wood tones',
        gallery: [
            'Oak-look laminate in Park Ridge family room',
            'Gray laminate flooring in River North loft',
            'Laminate installation in Evanston bedroom',
            'Water-resistant laminate in Chicago kitchen',
            'Wide-plank laminate in Gold Coast condo',
            'Before and after laminate transformation'
        ]
    },
    'hardwood': {
        hero: 'Classic hardwood flooring installation in historic Chicago home',
        gallery: [
            'Refinished oak hardwood in Lincoln Park Victorian',
            'New hardwood installation in Wicker Park brownstone',
            'Engineered hardwood in high-rise condo',
            'Reclaimed wood flooring in West Loop loft',
            'Hardwood floor repair and restoration',
            'Custom hardwood pattern in luxury home'
        ]
    },
    'tile': {
        hero: 'Ceramic tile installation in Chicago home entryway',
        gallery: [
            'Porcelain tile in modern Chicago bathroom',
            'Large format tiles in open concept kitchen',
            'Mosaic tile backsplash installation',
            'Heated tile floors in master bathroom',
            'Commercial tile installation in restaurant',
            'Outdoor patio tile installation'
        ]
    },
    'carpet-tile': {
        hero: 'Commercial carpet tile installation in Chicago office',
        gallery: [
            'Modular carpet tiles in corporate office',
            'Creative pattern design with carpet tiles',
            'High-traffic carpet tile in retail space',
            'Residential carpet tiles in basement',
            'Easy replacement of damaged carpet tile',
            'Various carpet tile patterns and colors'
        ]
    },
    'stone': {
        hero: 'Luxury marble flooring in Chicago Gold Coast residence',
        gallery: [
            'Carrara marble in master bathroom',
            'Granite tile in gourmet kitchen',
            'Travertine flooring in foyer',
            'Slate tile in mudroom',
            'Limestone flooring in wine cellar',
            'Natural stone mosaic accent'
        ]
    },
    'shower': {
        hero: 'Custom shower tile installation with waterproofing system',
        gallery: [
            'Walk-in shower with subway tile',
            'Luxury shower with marble walls',
            'Mosaic shower floor installation',
            'Shower niche and bench tiling',
            'Before and after shower renovation',
            'Waterproofing membrane installation'
        ]
    },
    'backsplash': {
        hero: 'Kitchen backsplash tile installation in Chicago home',
        gallery: [
            'Subway tile backsplash in white kitchen',
            'Mosaic backsplash behind stove',
            'Natural stone backsplash installation',
            'Glass tile backsplash with under-cabinet lighting',
            'Herringbone pattern backsplash',
            'Full-height backsplash installation'
        ]
    }
};

// Function to update images on a page
function updateImages(serviceType) {
    const images = serviceImages[serviceType];
    if (!images) return;
    
    // Update hero background with placeholder
    const heroPlaceholder = `
        <div style="
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #1C1F2A 0%, #5E5E5E 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #FFFFFF;
            font-family: 'Montserrat', sans-serif;
            text-align: center;
            padding: 20px;
        ">
            <div>
                <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor" style="opacity: 0.3; margin-bottom: 20px;">
                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                </svg>
                <p style="font-size: 1.25rem; font-weight: 600; margin-bottom: 10px;">HERO IMAGE PLACEHOLDER</p>
                <p style="font-size: 0.875rem; opacity: 0.8; max-width: 600px;">${images.hero}</p>
            </div>
        </div>
    `;
    
    // Gallery image placeholder template
    const galleryImageTemplate = (description, index) => `
        <div style="
            width: 100%;
            height: 300px;
            background: #E5E7EB;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
        ">
            <div>
                <svg width="60" height="60" viewBox="0 0 24 24" fill="#5E5E5E" style="opacity: 0.5; margin-bottom: 15px;">
                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                </svg>
                <p style="font-size: 0.875rem; color: #5E5E5E; font-family: 'Montserrat', sans-serif; line-height: 1.4;">
                    GALLERY IMAGE ${index + 1}<br>
                    <span style="font-size: 0.75rem; opacity: 0.8;">${description}</span>
                </p>
            </div>
        </div>
    `;
    
    return { heroPlaceholder, galleryImageTemplate };
}

// Function to add section to HTML file
function insertTestimonialsSection(htmlContent, serviceType) {
    // Find the best place to insert testimonials (before CTA section or before footer)
    const ctaIndex = htmlContent.indexOf('<section class="cta-section">');
    const footerIndex = htmlContent.indexOf('<footer');
    
    const insertIndex = ctaIndex !== -1 ? ctaIndex : footerIndex;
    
    if (insertIndex === -1) {
        console.error('Could not find suitable insertion point for testimonials');
        return htmlContent;
    }
    
    // Insert the testimonials HTML
    return htmlContent.slice(0, insertIndex) + testimonialsHTML + '\n\n' + htmlContent.slice(insertIndex);
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        testimonials,
        testimonialsHTML,
        serviceImages,
        updateImages,
        insertTestimonialsSection
    };
}

// Console message
console.log('Testimonials and image update script loaded. Use insertTestimonialsSection() to add testimonials to service pages.');