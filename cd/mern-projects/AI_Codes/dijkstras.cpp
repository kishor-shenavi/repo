#include<iostream>
#include<queue>
#include<vector>
#include<algorithm>
using namespace std;

void dijkstras(vector<vector<pair<int, int>>>& adj,
               vector<int>& dist,
               vector<int>& parent) {

    int seed = 0;

    priority_queue<
        pair<int,int>,
        vector<pair<int,int>>,
        greater<pair<int,int>>
    > pq;

    pq.push({0, seed});
    dist[seed] = 0;

    parent[seed] = -1;

    while(!pq.empty()) {

        auto p = pq.top();
        pq.pop();

        int node = p.second;
        int distance = p.first;

        for(auto& nbr : adj[node]) {

            int adjDist = nbr.first;
            int adjNode = nbr.second;

            if(distance + adjDist < dist[adjNode]) {

                dist[adjNode] = distance + adjDist;

                // STORE PARENT
                parent[adjNode] = node;

                pq.push({dist[adjNode], adjNode});
            }
        }
    }
}

int main() {

    int n = 6;

    vector<vector<pair<int,int>>> adj(n);

    adj[0].push_back({4,1});
    adj[0].push_back({4,2});

    adj[1].push_back({4,0});
    adj[1].push_back({2,2});

    adj[2].push_back({4,0});
    adj[2].push_back({2,1});
    adj[2].push_back({3,3});
    adj[2].push_back({6,5});
    adj[2].push_back({1,4});

    adj[3].push_back({3,2});
    adj[3].push_back({2,5});

    adj[4].push_back({1,2});
    adj[4].push_back({3,5});

    adj[5].push_back({6,2});
    adj[5].push_back({2,3});
    adj[5].push_back({3,4});

    // int n, e;

    // cout << "Enter number of nodes and edges: ";
    // cin >> n >> e;

    // vector<vector<pair<int,int>>> adj(n);

    // cout << "Enter edges (u v w):\n";

    // for(int i = 0; i < e; i++) {

    //     int u, v, w;
    //     cin >> u >> v >> w;

    //     // undirected graph
    //     adj[u].push_back({w, v});
    //     adj[v].push_back({w, u});
    // }

    vector<int> dist(n, 1e9);
    vector<int> parent(n);

    dijkstras(adj, dist, parent);

    // shortest path from 0 to 5
    int target = 5;

    vector<int> path;

    while(target != -1) {
        path.push_back(target);
        target = parent[target];
    }

    reverse(path.begin(), path.end());

    cout << "Shortest Path: ";

    for(int node : path) {
        cout << node << " ";
    }

    cout << endl;

    cout << "Distance = " << dist[5] << endl;
}