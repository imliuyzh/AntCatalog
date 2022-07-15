# Remember to comment out courseRateLimiter before testing.

import json, random
from locust import HttpUser, task, between

class User(HttpUser):
    # Each request should wait between 500ms to 1000ms.
    wait_time = between(0.5, 1)

    @task
    def match_instructors(self):
        '''Test the /instructors endpoint.'''
        instructor = random.choice(['KLEFSTAD, R.', 'SHINDLER, M.', 'DILLENCOURT, M.', 'VENKETASUBRAMANIAN', 'vewv342342vw', 'NAVRRO'])
        self.client.get(f'/instructors?name={instructor}')

    @task
    def get_statistics(self):
        '''Test the /courses endpoint with aggregate=false.'''
        courseNumber = random.choice(['260', '260P', '261', '261P', '263'])
        instructor = random.choice(['GOODRICH, M.', 'SHINDLER, M.', 'EPPSTEIN, D.', 'DILLENCOURT, M.', 'WORTMAN, M.'])
        offset = random.randint(0, 11)
        
        self.client.post("/courses", json=json.loads(
            '{' +
                '"values": {' +
                    '"department": ["COMPSCI"],' +
                   r'"courseNumber": ["' + courseNumber + r'"],' +
                    '"courseCode": null,' +
                   r'"instructor": ["' + instructor + r'"]' +
               '},' +
               '"options": {' +
                    '"aggregate": false,' +
                   f'"offset": {offset}' +
                '}' +
            '}'
        ))
        
    @task
    def get_aggregated_statistics(self):
        '''Test the /courses endpoint with aggregate=true.'''
        instructor = random.choice(['LOPES, C.', 'SHINDLER, M.', 'DILLENCOURT, M.'])
        self.client.post("/courses", json=json.loads(
            '{' +
                '"values": {' +
                    '"department": ["COMPSCI"],' +
                   r'"courseNumber": null,' +
                    '"courseCode": null,' +
                   r'"instructor": ["' + instructor + r'"]' +
               '},' +
               '"options": {' +
                    '"aggregate": true' +
                '}' +
            '}'
        ))
