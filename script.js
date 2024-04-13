


document.addEventListener('DOMContentLoaded', async () => {
    const imageSelection = document.getElementById('image-selection');
    const topTextInput = document.getElementById('topText');
    const bottomTextInput = document.getElementById('bottomText');
    const generateBtn = document.querySelector('.form button');
    const memeContainer = document.getElementById('memeContainer');
    
    let selectedMeme = null;

    try {
        // Fetch memes from Imgflip API
        const response = await fetch('https://api.imgflip.com/get_memes');
        const data = await response.json();
        const memes = data.data.memes;

        // Display memes in dropdown
        memes.forEach(meme => {
            const option = document.createElement('option');
            option.value = meme.id;
            option.textContent = meme.name;
            imageSelection.appendChild(option);
        });

        // Event listener for image selection
        imageSelection.addEventListener('change', () => {
            const selectedMemeId = imageSelection.value;
            selectedMeme = memes.find(meme => meme.id === selectedMemeId);
            if (selectedMeme) {
                const memeImg = new Image();
                memeImg.src = selectedMeme.url;
                memeImg.onload = function() {
                    memeContainer.innerHTML = ``;
                    memeContainer.appendChild(memeImg);
                };
            }
        });

        // Event listener for Generate Meme button click
        generateBtn.addEventListener('click', () => {
            if (!selectedMeme) {
                alert('Please select a meme.');
                return;
            }

            // Ensure both top and bottom text are provided
            const topTextValue = topTextInput.value.trim();
            const bottomTextValue = bottomTextInput.value.trim();
            if (!topTextValue || !bottomTextValue) {
                alert('Please provide both top and bottom text.');
                return;
            }

            // Generate the meme
            const memeImg = new Image();
            memeImg.src = selectedMeme.url;
            memeImg.onload = function() {
                memeContainer.innerHTML = ``;
                const canvas = document.createElement('canvas');
                canvas.width = memeImg.width;
                canvas.height = memeImg.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(memeImg, 0, 0, canvas.width, canvas.height);
                ctx.font = '30px Impact';
                ctx.fillStyle = 'white';
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 2;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.strokeText(topTextValue, canvas.width / 2, 0);
                ctx.fillText(topTextValue, canvas.width / 2, 0);
                ctx.textBaseline = 'bottom';
                ctx.strokeText(bottomTextValue, canvas.width / 2, canvas.height - 30);
                ctx.fillText(bottomTextValue, canvas.width / 2, canvas.height - 30);
                memeContainer.appendChild(canvas);
            };
        });

    } catch (error) {
        console.error('Error fetching memes:', error);
        memeContainer.textContent = 'Error fetching memes. Please try again later.';
    }
});







