// Image data with all images from the folder
const allImages = [
  // Regular images from the main folder

  {
    src: "images/64f1c7535c0dca2a223d6421_email signature 1.svg",
    name: "Email Signature 1",
    category: "Email Signatures",
  },
  {
    src: "images/blue-phone-link.png",
    name: "Blue Phone Link",
    category: "Icons",
  },
  {
    src: "images/cold-email-signature.webp",
    name: "Cold Email Signature",
    category: "Email Signatures",
  },
  {
    src: "images/content-prioritization-in-email-sugnature-optimized.png",
    name: "Content Prioritization",
    category: "Email Signatures",
  },
  {
    src: "images/directory-3-column-layout-example.png",
    name: "Directory Layout",
    category: "Layouts",
  },
  {
    src: "images/directory-wenatchee-valley.jpg",
    name: "Wenatchee Valley Directory",
    category: "Directories",
  },
  {
    src: "images/email-signature-banner-campaign.png",
    name: "Banner Campaign",
    category: "Email Signatures",
  },
  {
    src: "images/email-signature-template-email-footer-social-cover-premium-vector_434107-17-1024x512.webp",
    name: "Premium Template",
    category: "Email Signatures",
  },
  {
    src: "images/EmailSignature_Information_0121.png",
    name: "Information Signature",
    category: "Email Signatures",
  },

  { src: "images/hq720 (1).jpg", name: "HQ Image", category: "General" },
  {
    src: "images/il_570xN.5171328127_3asd.webp",
    name: "Design Template 1",
    category: "Templates",
  },
  {
    src: "images/il_fullxfull.4741175216_57xg.webp",
    name: "Design Template 2",
    category: "Templates",
  },
  {
    src: "images/il_fullxfull.5623349245_d1mn.avif",
    name: "Design Template 3",
    category: "Templates",
  },
  { src: "images/image-asset.png", name: "Image Asset", category: "General" },
  {
    src: "images/maxresdefault.jpg",
    name: "Max Resolution",
    category: "General",
  },
  { src: "images/mceclip0.png", name: "MC Clip", category: "General" },
  {
    src: "images/Member-Directory.png",
    name: "Member Directory",
    category: "Directories",
  },
  {
    src: "images/outlook-for-mac-add-social-icons-signature.webp",
    name: "Outlook Social Icons",
    category: "Email Signatures",
  },
  {
    src: "images/Professional-email-signature-Rocketseed.webp",
    name: "Professional Signature",
    category: "Email Signatures",
  },
  {
    src: "images/rqfe-bottin2.jpg",
    name: "RQFE Bottin",
    category: "Directories",
  },

  // Laz images - these will be distributed evenly
  {
    src: "images/laz/01.jpg",
    name: "Laz Collection 01",
    category: "Laz Collection",
    isLaz: true,
  },
  {
    src: "images/laz/02.jpg",
    name: "Laz Collection 02",
    category: "Laz Collection",
    isLaz: true,
  },
  {
    src: "images/laz/03.JPG",
    name: "Laz Collection 03",
    category: "Laz Collection",
    isLaz: true,
  },
];

// Function to distribute Laz images evenly among other images
function distributeImages() {
  const regularImages = allImages.filter((img) => !img.isLaz);
  const lazImages = allImages.filter((img) => img.isLaz);

  const totalImages = allImages.length;
  const distributedImages = [];

  // Calculate positions for Laz images
  const lazPositions = [
    0, // First image (01.jpg)
    Math.floor(totalImages / 2), // Middle image (02.jpg)
    totalImages - 1, // Last image (03.jpg)
  ];

  let regularIndex = 0;
  let lazIndex = 0;

  for (let i = 0; i < totalImages; i++) {
    if (lazPositions.includes(i)) {
      distributedImages.push(lazImages[lazIndex]);
      lazIndex++;
    } else {
      distributedImages.push(regularImages[regularIndex]);
      regularIndex++;
    }
  }

  return distributedImages;
}

// Global variables
let currentImages = [];
let currentImageIndex = 0;

// DOM elements
const gallery = document.getElementById("gallery");
const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const closeModal = document.getElementById("closeModal");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

// Initialize the gallery
function initializeGallery() {
  currentImages = distributeImages();
  renderGallery();
  setupEventListeners();
}

// Render the gallery
function renderGallery() {
  gallery.innerHTML = "";

  currentImages.forEach((image, index) => {
    const galleryItem = createGalleryItem(image, index);
    gallery.appendChild(galleryItem);
  });
}

// Create a gallery item
function createGalleryItem(image, index) {
  const item = document.createElement("div");
  item.className = `gallery-item ${image.isLaz ? "laz-image" : ""}`;

  item.innerHTML = `
        <img src="${image.src}" alt="${image.name}" loading="lazy">
        <div class="overlay">
            <h3>${image.name}</h3>
            <p>Category: ${image.category}</p>
        </div>
    `;

  // Add click event to open modal
  item.addEventListener("click", () => openModal(index));

  return item;
}

// Open modal with image
function openModal(index) {
  currentImageIndex = index;
  const image = currentImages[index];

  modalImage.src = image.src;
  modalImage.alt = image.name;
  modal.style.display = "block";

  // Disable body scroll
  document.body.style.overflow = "hidden";

  // Add entrance animation
  modal.style.animation = "fadeIn 0.3s ease";
}

// Close modal
function closeModalFunc() {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

// Navigate to previous image
function previousImage() {
  currentImageIndex =
    (currentImageIndex - 1 + currentImages.length) % currentImages.length;
  const image = currentImages[currentImageIndex];
  modalImage.src = image.src;
  modalImage.alt = image.name;
}

// Navigate to next image
function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % currentImages.length;
  const image = currentImages[currentImageIndex];
  modalImage.src = image.src;
  modalImage.alt = image.name;
}

// Setup event listeners
function setupEventListeners() {
  // Modal controls
  closeModal.addEventListener("click", closeModalFunc);
  prevBtn.addEventListener("click", previousImage);
  nextBtn.addEventListener("click", nextImage);

  // Close modal when clicking outside the image
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModalFunc();
    }
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (modal.style.display === "block") {
      switch (e.key) {
        case "Escape":
          closeModalFunc();
          break;
        case "ArrowLeft":
          previousImage();
          break;
        case "ArrowRight":
          nextImage();
          break;
      }
    }
  });
}

// Add smooth scrolling and intersection observer for animations
function addScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe gallery items
  document.querySelectorAll(".gallery-item").forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(30px)";
    item.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(item);
  });
}

// Error handling for images that fail to load
function handleImageErrors() {
  const images = document.querySelectorAll(".gallery-item img");
  images.forEach((img) => {
    img.addEventListener("error", function () {
      this.src =
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=";
      this.alt = "Image not found";
    });
  });
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeGallery();

  // Add a small delay for the scroll animations to work properly
  setTimeout(() => {
    addScrollAnimations();
    handleImageErrors();
  }, 100);
});

// Add some performance optimizations
window.addEventListener("load", () => {
  // Preload next/previous images in modal for smoother navigation
  const preloadImage = (src) => {
    const img = new Image();
    img.src = src;
  };

  // Preload the first few images
  currentImages.slice(0, 5).forEach((image) => {
    preloadImage(image.src);
  });
});
