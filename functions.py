# Define function to fetch shared albums
def fetch_shared_albums(page_token=None):
    url = 'https://photoslibrary.googleapis.com/v1/sharedAlbums'
    params = {
        'pageSize': 50,  # Maximum number of albums to return
        'pageToken': page_token,  # Continuation token for pagination
    }

    # Make GET request to fetch shared albums
    response = authed_session.get(url, headers=auth_headers, params=params)

    # Check if request was successful
    if response.status_code == 200:
        data = response.json()
        return data.get('sharedAlbums', []), data.get('nextPageToken')
    else:
        print(f'Error fetching shared albums: {response.status_code}')
        return [], None