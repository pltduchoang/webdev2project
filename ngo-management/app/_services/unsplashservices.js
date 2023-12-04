const ACCESS_KEY = '9xardsZ8M9XhBaqY_X-3KlSAhegYNR7ozyPpoT_ir8'; //Insert M at the end Replace with your actual Unsplash access key

const fetchRandomImage = async () => {
  try {
    const response = await fetch(`https://api.unsplash.com/photos/random/?client_id=${ACCESS_KEY}&query=street photography`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch image');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data at services:', error);
  }
};

export default fetchRandomImage;