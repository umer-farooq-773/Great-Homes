
            document.getElementById('year').textContent = new Date().getFullYear();
            const menu = document.querySelector('.menu-btn'), links = document.querySelector('.links');
            menu.addEventListener('click', () => {
                const open = links.classList.toggle('open');
                menu.setAttribute('aria-expanded', String(open));
                menu.textContent = open ? '×' : '☰';
            });
            document.querySelectorAll('.links a').forEach(a => a.addEventListener('click', () => {
                links.classList.remove('open');
                menu.setAttribute('aria-expanded', 'false');
                menu.textContent = '☰';
            }));
            document.getElementById('quote-form').addEventListener('submit', e => {
                e.preventDefault();
                document.getElementById('form-status').textContent = 'Thank you! This demo form is not connected yet. Please configure a form endpoint to receive quote requests.';
            });


     
            document.querySelectorAll('a[href*="wa.me"]').forEach(a => {
                a.addEventListener('click', e => {
                    if (!/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                        e.preventDefault();
                        window.open('https://web.whatsapp.com/send?phone=923424956071&text=' + encodeURIComponent('Hello Great Homes'), '_blank', 'noopener');
                    }
                });
            });
   

   

async function loadGreatHomesFeed() {
    const pageId = '1841624206110939';
    const accessToken = 'EAANX61bN1JUBStLRfEdgyZACRuXdjqW2zAYlOl7nKP83tVZBJyZA7Hgxs0EyZCZA9C7FEnfUCONI00dQ7XyGe9ZAZC14V7RYCIglbcVrJvxsEh1rZCmZBLtdXc9JDEN8tda3d235BgNNObKbeNPpuyAzrD0q3S6KzaLicnYhpZC8x0wPZCggrtxquh5ZCnO4NutlvlWIgKGl'; 
    const fbContainer = document.getElementById('fb-grid');
    const facebookPageUrl = 'https://www.facebook.com/builders.developer/';

    try {
        const res = await fetch(`https://graph.facebook.com/v26.0/${pageId}/posts?fields=message,full_picture,created_time,permalink_url&limit=9&access_token=${accessToken}`);
        const data = await res.json();
        
        if (data.error) {
            fbContainer.innerHTML = `<p class="fb-status">Unable to load feed: ${data.error.message}</p>`;
            return;
        }

        let output = '';
        if (data.data && data.data.length > 0) {
            data.data.forEach(post => {
                const postDate = post.created_time ? new Date(post.created_time).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';
                output += `
                    <article class="fb-card">
                        ${post.full_picture ? `<img src="${post.full_picture}" alt="Great Homes Update" loading="lazy" />` : ''}
                        <div class="fb-card-body">
                            <div>
                                <time>${postDate}</time>
                                <p>${post.message ? post.message : 'Check out our latest update on Facebook!'}</p>
                            </div>
                            <a href="${post.permalink_url}" target="_blank" rel="noopener">View on Facebook →</a>
                        </div>
                    </article>
                `;
            });

            // 9 posts ke neechye View All button add karne ke liye
            output += `
                <div class="fb-load-more-container">
                    <a href="${facebookPageUrl}" target="_blank" rel="noopener" class="btn-facebook-all">
                        View All Feeds on Facebook →
                    </a>
                </div>
            `;

            fbContainer.innerHTML = output;
        } else {
            fbContainer.innerHTML = '<p class="fb-status">No recent Facebook posts found.</p>';
        }
    } catch (err) {
        console.error('Error loading feed:', err);
        fbContainer.innerHTML = '<p class="fb-status">Failed to connect to Facebook. Please try again later.</p>';
    }
}

loadGreatHomesFeed();
