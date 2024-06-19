document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('.star-rating span');
    let selectedRating = 0;


    // fetch("https://fakestoreapi.com/products").then(data=>data.json()).then(res=>console.log(res))

    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            selectedRating = index + 1; // index is zero-based, rating starts from 1

            // Clear all selections first
            stars.forEach(s => s.classList.remove('selected'));

            // Highlight stars from selected star back to the first star
            for (let i = selectedRating - 1; i >= 0; i--) {
                stars[i].classList.add('selected');
            }
        });
    });

    const feedbackForm = document.getElementById('feedbackForm');
    const feedbackItems = document.getElementById('feedbackItems');
    const avgRating = document.getElementById('avgRating');

    let feedbackData = [];

   
    feedbackForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;

        const feedback = document.getElementById('feedback').value;

        if (selectedRating === 0) {
            alert('Please provide a rating');
            return;
        }

        // Add feedback to the list
        feedbackData.push({ name, rating: selectedRating, feedback });
        renderFeedbackItems();
        updateAverageRating();

        // Clear the form
        feedbackForm.reset();
        selectedRating = 0;
        stars.forEach(star => star.classList.remove('selected'));
    });

    function renderFeedbackItems() {
        feedbackItems.innerHTML = '';
        feedbackData.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `Name: ${item.name}, Rating: ${item.rating}, Feedback: ${item.feedback}`;
            feedbackItems.appendChild(li);
        });
    }

    function updateAverageRating() {
        const totalRating = feedbackData.reduce((sum, item) => sum + item.rating, 0);
        const average = totalRating / feedbackData.length || 0; // Handle divide by zero
        avgRating.textContent = average.toFixed(1);
    }

    console.log(feedbackData)
});
