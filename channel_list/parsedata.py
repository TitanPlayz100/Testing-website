'''
Import necessary pip packages, 
Get oauth client and secret using google cloud console with youtube API, 
Run python parsedata.py
'''

import json
import os

# pip install --upgrade google-api-python-client
# pip install --upgrade google-auth-oauthlib google-auth-httplib2
import google_auth_oauthlib.flow
import googleapiclient.discovery
import googleapiclient.errors

entire_sub_list = []

def get_subs():
    os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"
    scopes = ["https://www.googleapis.com/auth/youtube.readonly"]

    api_service_name = "youtube"
    api_version = "v3"

    # you have to make oauth client by going to google clound console
    client_secrets_file = "client_secrets.json"  

    flow = google_auth_oauthlib.flow.InstalledAppFlow.from_client_secrets_file(client_secrets_file, scopes)
    credentials = flow.run_local_server()
    youtube = googleapiclient.discovery.build(api_service_name, api_version, credentials=credentials)
    
    process_request(youtube)


def process_request(youtube, next_page_token=None):
    request = None
    if next_page_token is not None:
        request = youtube.subscriptions().list(
            part="snippet",
            channelId="UCUCtxzo3wXprH383RMQKlYQ",
            maxResults=50,
            order="alphabetical",
            prettyPrint=True,
            pageToken=next_page_token
        )
    else:
        request = youtube.subscriptions().list(
            part="snippet",
            channelId="UCUCtxzo3wXprH383RMQKlYQ",
            maxResults=50,
            order="alphabetical",
            prettyPrint=True
        )

    response: dict = request.execute()
    entire_sub_list.append(response)
    next_page_token = response.get("nextPageToken", None)

    if next_page_token is not None:
        process_request(youtube, next_page_token)
    

def parse_subs():
    subs = entire_sub_list

    subslist = []
    for page in subs:
        for channel in page["items"]:
            info = channel["snippet"]

            id = info["resourceId"]["channelId"]
            name = info["title"]
            desc = info["description"]
            pfp = info["thumbnails"]["default"]["url"]
            subslist.append({
                "name": name,
                "desc": desc,
                "pfp": pfp,
                "link": f'https://www.youtube.com/channel/{id}'
            })

    with open('subscriptions.json', 'w') as out:
        json.dump(subslist, out)


if __name__ == "__main__":
    get_subs()
    parse_subs()