// Implement A Star Algorithm for any game search problem

#include<iostream>
#include<vector>
#include<unordered_map>
#include<set>
#include<queue>
using namespace std;

vector<vector<int>> goal = {
    {1,2,3},
    {8,0,4},
    {7,6,5}
};

static unordered_map<int, pair<int,int>> goalPos;

struct Node {
    vector<vector<int>> state;
    int g;
    int h; 
    int f;
};

struct Compare{
    bool operator () (Node a, Node b) {
        return a.f > b.f;
    }
};

int manhattanDistance(vector<vector<int>> state) {
    int distance = 0;

    for(int i=0; i<3; i++) {
        for(int j=0; j<3; j++) {
            int value = state[i][j];

            int x = goalPos[value].first;
            int y = goalPos[value].second;

            distance += abs(i-x) + abs(j-y);
        }
    }

    return distance;
}

void solve(vector<vector<int>> start) {
    priority_queue<Node, vector<Node>, Compare> pq;
    set<vector<vector<int>>> visited;

    Node startNode;
    startNode.state = start;
    startNode.g = 0;
    startNode.h = manhattanDistance(start);
    startNode.f = startNode.g + startNode.h;

    pq.push(startNode);

    while(!pq.empty()) {
        Node currentNode = pq.top();
        pq.pop();

        if(currentNode.state == goal) {
            cout<<"GOAL REACHED"<<endl;

            for(int i=0; i<3; i++) {
                for(int j=0; j<3; j++) {
                    cout<<currentNode.state[i][j]<<" ";
                }
                cout<<endl;
            }
            return;
        }

        visited.insert(currentNode.state);
        int x, y;

        for(int i=0; i<3; i++) {
            for(int j=0; j<3; j++) {
                if(currentNode.state[i][j] == 0){
                    x = i;
                    y = j;
                }
            }
        }

        int dx[] = {-1,1,0,0};
        int dy[] = {0,0,1,-1};

        for(int i=0; i<4; i++) {
            int nx = x + dx[i];
            int ny = y + dy[i];

            if(!(nx>=0 && nx<3 && ny>=0 && ny<3)) continue;

            vector<vector<int>> newState = currentNode.state;
            swap(newState[x][y], newState[nx][ny]); 

            if(visited.find(newState) == visited.end()) {
                Node newNode;
                newNode.state = newState;
                newNode.g = currentNode.g + 1;
                newNode.h = manhattanDistance(newState);
                newNode.f = newNode.g + newNode.h;

                pq.push(newNode);
            }
        }
    }
    cout<<"No answer found"<<endl;

}

int main() {
    vector<vector<int>> start = {
        {2,8,3},
        {1,6,4},
        {7,0,5}
    };

    for(int i=0; i<3; i++) {
        for(int j=0; j<3; j++) {
            goalPos[start[i][j]] = {i, j};
        }
    }

    solve(start);

    return 0;
}