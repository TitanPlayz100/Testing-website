'''
Import necessary pip packages, 
Get oauth client and secret using google cloud console with youtube API, 
Run python parsedata.py
'''
# pip install --upgrade google-api-python-client
# pip install --upgrade google-auth-oauthlib google-auth-httplib2
from json import dump
from os import environ
import google_auth_oauthlib.flow
import googleapiclient.discovery
import googleapiclient.errors

entire_sub_list = []

def get_subs():
    environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"
    scopes = ["https://www.googleapis.com/auth/youtube.readonly"]
    api_service_name = "youtube"
    api_version = "v3"
    client_secrets_file = "client_secrets.json"

    flow = google_auth_oauthlib.flow.InstalledAppFlow.from_client_secrets_file(client_secrets_file, scopes)
    credentials = flow.run_local_server()
    youtube = googleapiclient.discovery.build(api_service_name, api_version, credentials=credentials)
    process_request(youtube)

def process_request(youtube, next_page_token=None):
    request = None
    request = youtube.subscriptions().list(
        part="snippet",
        channelId="UCUCtxzo3wXprH383RMQKlYQ",
        maxResults=50,
        order="alphabetical",
        prettyPrint=True,
        pageToken=next_page_token
    )
    
    response: dict = request.execute()
    entire_sub_list.append(response)
    next_page_token = response.get("nextPageToken", None)
    if next_page_token is not None:
        process_request(youtube, next_page_token)
    
def parse_subs():
    subslist = []
    for page in entire_sub_list:
        for channel in page["items"]:
            info = channel["snippet"]
            id = info["resourceId"]["channelId"]
            subslist.append({
                "name": info["title"],
                "desc": info["description"],
                "pfp": info["thumbnails"]["default"]["url"],
                "link": f'https://www.youtube.com/channel/{id}'
            })

    with open('subscriptions.json', 'w') as out:
        dump(subslist, out)

if __name__ == "__main__":
    get_subs()
    parse_subs()