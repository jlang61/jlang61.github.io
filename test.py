import os
import pandas as pd
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request

scopes=['https://www.googleapis.com/auth/photoslibrary.readonly']

creds = None

if os.path.exists('_secrets_/token.json'):
    creds = Credentials.from_authorized_user_file('_secrets_/token.json', scopes)
        
if not creds or not creds.valid:
    if creds and creds.expired and creds.refresh_token:
        creds.refresh(Request())
    else:
        flow = InstalledAppFlow.from_client_secrets_file(
            '_secrets_/client_secret.json', scopes)
        creds = flow.run_local_server()
    print(creds)
    # Save the credentials for the next run
    with open('_secrets_/token.json', 'w') as token:
        token.write(creds.to_json())
        
        
from google.auth.transport.requests import AuthorizedSession
authed_session = AuthorizedSession(creds)

nextPageToken = None
idx = 0
media_items = []
while True:
    idx += 1
    print(idx)
    
    response = authed_session.post(
        'https://photoslibrary.googleapis.com/v1/mediaItems:search', 
        headers = { 'content-type': 'application/json' },
        json={ 
            "pageSize": 100,
            "pageToken": nextPageToken,
            "filters": {
                "dateFilter": {
                    "ranges": [{ 
                        "startDate": {
                            "year": 2023,
                            "month": 1,
                            "day": 1,
                        },
                        "endDate": {
                            "year": 2023,
                            "month": 1,
                            "day": 26,
                        }
                    }]
                }
            }
        })
    
    response_json = response.json()
    if "mediaItems" in response_json:
        media_items += response_json["mediaItems"]
    
    if not "nextPageToken" in response_json:
        break
        
    nextPageToken = response_json["nextPageToken"]
# print(media_items[0])

photos_df = pd.DataFrame(media_items)

# Extract creationTime from the mediaMetadata dictionary
photos_df["creationTime_metadata_dt"] = pd.to_datetime(photos_df["mediaMetadata"].apply(lambda x: x.get("creationTime")))

# Drop the original mediaMetadata column
photos_df.drop(columns=["mediaMetadata"], inplace=True)

photos_df["creationTime_metadata_hour"] = photos_df.creationTime_metadata_dt.dt.hour

# print(photos_df["creationTime_metadata_hour"])

import os
import requests
import subprocess

# Define the directory where you want to save the image
image_directory = 'images'
os.makedirs(image_directory, exist_ok=True)

# Define the filename for the image
image_filename = os.path.join(image_directory, 'photo.jpg')

# Fetch the image data
image_data_response = authed_session.get(photos_df.baseUrl[25])
print(image_data_response)
image_data = image_data_response.content
print("image_data")
print(image_data)
# print(image_data)


    
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

# Fetch shared albums and print their titles
shared_albums = []
next_page_token = None
while True:
    albums_batch, next_page_token = fetch_shared_albums(next_page_token)
    shared_albums.extend(albums_batch)
    if not next_page_token:
        break

# Display shared album titles

# if shared_albums:
#     print('Shared Albums:')
#     for album in shared_albums:
#         if 'title' in album:
#             print(album['title'])
# else:
#     print('No shared albums found.')
    
# print(shared_albums)

# pd_shared = pd.DataFrame(shared_albums)
# # print(pd_shared)
# print(pd_shared.columns)

# identifier = 'coverPhotoBaseUrl'
# if shared_albums:
#     print('Shared Albums:')
#     for album in shared_albums:
#         if identifier in album:
#             print(album[identifier])
#         break
# else:
#     print('No shared albums found.')

# print(pd_shared.title[2])
# print(len(pd_shared))

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
    # image_data_response = authed_session.get(pd_shared.coverPhotoBaseUrl[i] + "=w500-h250")
    # print (image_data_response)
# image_data_response = authed_session.get(pd_shared.coverPhotoBaseUrl[2] + "=w500-h250")
# image_data = image_data_response.content
# # Save the image data to a file
# with open(image_filename, 'wb') as f:
#     f.write(image_data)

# # Open the image using the default image viewer
# print({image_filename})
# if os.name == 'posix':  # Linux/macOS
#     subprocess.call(['open', image_filename])
# elif os.name == 'nt':  # Windows
#     os.startfile(image_filename)
# else:
#     print('Image saved:', image_filename)