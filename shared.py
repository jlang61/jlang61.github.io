import os
import pandas as pd
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from google.auth.transport.requests import AuthorizedSession


creds = None
scopes=['https://www.googleapis.com/auth/photoslibrary.readonly']

if os.path.exists('_secrets_/token.json'):
    creds = Credentials.from_authorized_user_file('_secrets_/token.json', scopes)
        
if not creds or not creds.valid:
    if creds and creds.expired and creds.refresh_token:
        creds.refresh(Request())
    else:
        flow = InstalledAppFlow.from_client_secrets_file(
            '_secrets_/client_secret.json', scopes)
        creds = flow.run_local_server()
    with open('_secrets_/token.json', 'w') as token:
        token.write(creds.to_json())
        
authed_session = AuthorizedSession(creds)
auth_headers = { 'content-type': 'application/json' }

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
    
shared_albums = []
next_page_token = None

# Define function to extract metadata from media items
while True:
    albums_batch, next_page_token = fetch_shared_albums(next_page_token)
    shared_albums.extend(albums_batch)
    if not next_page_token:
        break
pd_shared = pd.DataFrame(shared_albums)
print(pd_shared.columns)


def fetch_album_media(mediaItemIds, titles):
    url = f'https://photoslibrary.googleapis.com/v1/mediaItems:batchGet'
    params = {'mediaItemIds': mediaItemIds}
    # Make GET request to fetch media item
    response = authed_session.get(url, headers=auth_headers, params = params)

    creation_times = []
    # Check if request was successful
    if response.status_code == 200:
        media_item_data = response.json()
        # print(media_item_data.mediaItemResults)
        # response will be mediaItemResults
        mediaItemResults = media_item_data.get('mediaItemResults', {})
        i = 0
        for result in mediaItemResults:
            title = titles[i]
            mediaItem = result.get('mediaItem', {})
            mediaMetaData = mediaItem.get('mediaMetadata', {})
            creation_time = mediaMetaData.get('creationTime',{})
            creation_times.append(creation_time)
            print("title:", title, end = " ")
            print("creation_time", creation_time)
            i += 1
        # creation_time = metadata.get('creationTime')
        # print(f"Photo ID: {albumTitle}, Creation Time: {creation_time}")
    else:
        print(response.content)
        print(f'Error fetching media item: {response.status_code}')
    return creation_times
    # return creation_time
temp_creations = []
temp_titles = []


row_num = 0
num_albums = len(pd_shared)
total_creations = []
total_titles = []
while row_num < num_albums:
    # Iterate through 50 at a time
    if num_albums - row_num >= 49:
        batch_df = pd_shared.iloc[row_num:row_num + 49]
    else:
        batch_df = pd_shared.iloc[row_num:]

    # Extract batch of coverPhotoMediaItemId values and titles
    batch_coverPhotoMediaItemId = list(batch_df['coverPhotoMediaItemId'])
    batch_titles = list(batch_df['title'])

    # Create a dictionary mapping coverPhotoMediaItemId to title
    id_to_title = {item_id: title for item_id, title in zip(batch_coverPhotoMediaItemId, batch_titles)}

    # Remove duplicates from the batch set and corresponding titles
    unique_ids = list(set(batch_coverPhotoMediaItemId))
    unique_titles = [id_to_title[item_id] for item_id in unique_ids]
    total_titles += unique_titles
    removed_titles = [title for title in batch_titles if batch_titles.count(title) > 1]
    print("removed title", removed_titles)
    # Fetch creation times
    creation_times = fetch_album_media(unique_ids, unique_titles)
    total_creations += creation_times

    # Update row_num for next iteration
    row_num += len(batch_df)

print(len(total_titles))
print(len(total_creations))
pd_creations = pd.DataFrame({"Creation Time": total_creations, "Titles": total_titles})
print(pd_creations)
# # Iterate through shared albums
# for album in shared_albums:
#     # Check if the album has a title and cover photo media item ID
#     if 'title' in album and 'coverPhotoMediaItemId' in album:
#         # Fetch creation time for the cover photo and append to temp_creations list
#         creation_time = fetch_album_media(album['coverPhotoMediaItemId'], album['title'])
#         temp_creations.append(creation_time)
#         # Append album title to temp_titles list
#         temp_titles.append(album['title'])

# # Create DataFrame from the collected data
# data = {'Creation Time': temp_creations, 'Titles': temp_titles}
# df = pd.DataFrame(data)

# # Display the DataFrame
# print(df)
    
    # print(f"Fetching media items for album: {album['title']} (ID: {album_id})")
    # extract_metadata(album_id)
    
    
    
# while True:
#     albums_batch, next_page_token = fetch_shared_albums(next_page_token)
#     shared_albums.extend(albums_batch)
#     if not next_page_token:
#         break
# pd_shared = pd.DataFrame(shared_albums)
# print(pd_shared.columns)

# for album in shared_albums:
#     print (album[])
# print("import { title } from \"process\";")
# print ("export const galleryImages2023_2024: GalleryImage[] = [")
# for j in range(len(pd_shared)):
#     i = len(pd_shared) - j - 1
#     print("{")
#     print ("id: ", j + 1)
#     print ("title: \"", pd_shared.title[i], "\"", sep = '')
#     url_title = str(pd_shared.title[i]).replace(' ', '_').lower()
#     print ("imageUrl: \"/gallery_photos/2023-2024/", url_title, ".jpg\"", sep='')
#     print ("link: \"", pd_shared.productUrl[i], "\"", sep ='')
#     print("},")
# print("]")