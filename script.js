document.addEventListener('DOMContentLoaded', () => {
    // Slider functionality
    let slideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    function showSlide(index) {
        if (index >= totalSlides) slideIndex = 0;
        if (index < 0) slideIndex = totalSlides - 1;

        document.querySelector('.slider-container').style.transform = `translateX(-${slideIndex * 100}%)`;
    }

    document.querySelector('.next').addEventListener('click', () => {
        slideIndex++;
        showSlide(slideIndex);
    });

    document.querySelector('.prev').addEventListener('click', () => {
        slideIndex--;
        showSlide(slideIndex);
    });

    showSlide(slideIndex);

    // Modal functionality
    document.getElementById('loginBtn').onclick = function() {
        document.getElementById('loginModal').style.display = 'block';
    };

    document.getElementById('signupBtn').onclick = function() {
        document.getElementById('signupModal').style.display = 'block';
    };

    document.getElementById('loginClose').onclick = function() {
        document.getElementById('loginModal').style.display = 'none';
    };

    document.getElementById('signupClose').onclick = function() {
        document.getElementById('signupModal').style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target == document.getElementById('loginModal')) {
            document.getElementById('loginModal').style.display = 'none';
        }
        if (event.target == document.getElementById('signupModal')) {
            document.getElementById('signupModal').style.display = 'none';
        }
    };

    // Form submissions
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        console.log(`Login with Email: ${email}, Password: ${password}`);
        alert('Login successful!');
        document.getElementById('loginModal').style.display = 'none';
    });

    document.getElementById('signupForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        console.log(`Signup with Name: ${name}, Email: ${email}, Password: ${password}`);
        alert('Signup successful!');
        document.getElementById('signupModal').style.display = 'none';
    });

    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault();

        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var message = document.getElementById('message').value;

        if (!name || !email || !message) {
            alert('Please fill out all fields.');
            return;
        }

        console.log(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`);
        alert('Thank you for your message! We will get back to you soon.');
    });

    // Show/Hide Scroll-to-Top button
    window.addEventListener('scroll', () => {
        const scrollButton = document.querySelector('.scroll-to-top');
        if (window.scrollY > 300) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        }
    });

    document.querySelector('.scroll-to-top').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});



const url = 'Gym Schedule.pdf'; // Path to your PDF file

const pdfjsLib = window['pdfjs-dist/build/pdf'];
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.15.349/pdf.worker.min.js';

// Asynchronously download PDF.
const loadingTask = pdfjsLib.getDocument(url);
loadingTask.promise.then(pdf => {
    console.log('PDF loaded');

    // Fetch the first page.
    pdf.getPage(1).then(page => {
        console.log('Page loaded');

        const scale = 1.5; // Initial zoom scale
        const viewport = page.getViewport({ scale });

        // Prepare canvas using PDF page dimensions.
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        document.getElementById('pdf-viewer').appendChild(canvas);

        // Render PDF page into canvas context.
        const renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        page.render(renderContext).promise.then(() => {
            console.log('Page rendered');
        });

        // Handle pinch-to-zoom.
        const pdfViewer = document.getElementById('pdf-viewer');
        pdfViewer.addEventListener('wheel', function(event) {
            if (event.deltaY < 0) {
                scale += 0.1; // Zoom in
            } else {
                scale = Math.max(0.1, scale - 0.1); // Zoom out
            }
            const newViewport = page.getViewport({ scale });
            canvas.height = newViewport.height;
            canvas.width = newViewport.width;
            page.render({
                canvasContext: context,
                viewport: newViewport
            });
            event.preventDefault();
        });
    });
}, reason => {
    console.error(reason);
});
const pdfViewer = document.getElementById('pdf-viewer');
const mc = new Hammer(pdfViewer);

mc.get('pinch').set({ enable: true });

mc.on('pinch', function(event) {
    const newScale = scale * event.scale;
    scale = Math.max(0.1, newScale); // Prevent too small scale
    const newViewport = page.getViewport({ scale });
    canvas.height = newViewport.height;
    canvas.width = newViewport.width;
    page.render({
        canvasContext: context,
        viewport: newViewport
    });
});


//  show gym schedule details
function showDetails(classId) {
    var details = document.querySelectorAll('.gym-details');
    details.forEach(function(detail) {
        detail.style.display = 'none';
    });

    var selectedDetail = document.getElementById(classId);
    if (selectedDetail) {
        selectedDetail.style.display = 'block';
    }
}
