import requests
from multiprocessing import Pool

headers = {
    'content-type': 'application/json',
}

json_data = {
    'query': 'query Tests {\n  tests {\n    Name\n  }\n}',
    'variables': {},
}


def send_request(val):
    while True:
        response = requests.post(
            'http://localhost:4000/graphql', headers=headers, json=json_data)
        data = response.json()
        print(data)


if __name__ == '__main__':
    with Pool(200) as p:
        p.map(send_request, range(200))


# Note: json_data will not be serialized by requests
# exactly as it was in the original request.
# data = '{"query":"query Tests {\\n  tests {\\n    Name\\n  }\\n}","variables":{}}'
# response = requests.post('http://localhost:4000/graphql', headers=headers, data=data)
