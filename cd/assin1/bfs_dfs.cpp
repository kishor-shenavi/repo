#include <iostream>
#include <vector>
#include <queue>

using namespace std;

class Graph {
    int vertices;
    vector<vector<int>> adj;

public:
    Graph(int v) {
        vertices = v;
        adj.resize(v);
    }

    // Add edge for undirected graph
    void addEdge(int u, int v) {
        adj[u].push_back(v);
        adj[v].push_back(u);
    }

    // Recursive DFS function
    void DFS(int vertex, vector<bool>& visited) {
        visited[vertex] = true;
        cout << vertex << " ";

        for (int neighbour : adj[vertex]) {
            if (!visited[neighbour]) {
                DFS(neighbour, visited);
            }
        }
    }

    // BFS function
    void BFS(int start) {
        vector<bool> visited(vertices, false);
        queue<int> q;

        visited[start] = true;
        q.push(start);

        while (!q.empty()) {
            int current = q.front();
            q.pop();

            cout << current << " ";

            for (int neighbour : adj[current]) {
                if (!visited[neighbour]) {
                    visited[neighbour] = true;
                    q.push(neighbour);
                }
            }
        }
    }

    // DFS for all disconnected components
    void DFSAll() {
        vector<bool> visited(vertices, false);

        cout << "\nDFS Traversal for all vertices:\n";

        for (int i = 0; i < vertices; i++) {
            if (!visited[i]) {
                DFS(i, visited);
            }
        }

        cout << endl;
    }

    // BFS for all disconnected components
    void BFSAll() {
        vector<bool> visited(vertices, false);

        cout << "\nBFS Traversal for all vertices:\n";

        for (int i = 0; i < vertices; i++) {

            if (!visited[i]) {

                queue<int> q;
                visited[i] = true;
                q.push(i);

                while (!q.empty()) {
                    int current = q.front();
                    q.pop();

                    cout << current << " ";

                    for (int neighbour : adj[current]) {
                        if (!visited[neighbour]) {
                            visited[neighbour] = true;
                            q.push(neighbour);
                        }
                    }
                }
            }
        }

        cout << endl;
    }
};

int main() {

    Graph g(7);

    // Undirected graph edges
    g.addEdge(0, 1);
    g.addEdge(0, 2);
    g.addEdge(1, 3);
    g.addEdge(2, 4);
    g.addEdge(4, 5);

    // Vertex 6 is disconnected

    cout << "DFS starting from vertex 0:\n";
    vector<bool> visited(7, false);
    g.DFS(0, visited);

    cout << "\n\nBFS starting from vertex 0:\n";
    g.BFS(0);

    g.DFSAll();
    g.BFSAll();

    return 0;
}




















// #include<iostream>
// #include<vector>
// #include<queue>

// using namespace std;

// class InstagramGraph {

// public:
//     int v;
//     vector<vector<int>> graph;

//     InstagramGraph()
//     {
//         v = 0;
//         graph.assign(v, {});
//     }

//     void setVertices(int vertices)
//     {
//         v = vertices;
//         graph.assign(v, {});
//     }

//     void addFriendship(int u, int v)
//     {
//         graph[u].push_back(v);
//         graph[v].push_back(u);
//     }

//     void makeConnections()
//     {
//         int vertices, edges;
//         cout << "Enter number of users (vertices): ";
//         cin >> vertices;

//         cout << "Enter number of connections (edges): ";
//         cin >> edges;
//         cout << endl;

//         setVertices(vertices);
//         cout << "Enter connections (u v) pairs:\n";

//         for (int i = 0; i < edges; i++)
//         {
//             int u, v;
//             cout << "Edge " << i + 1 << ": ";
//             cin >> u >> v;
//             addFriendship(u, v);
//         }
//         cout << endl;
//     }

//     void dfsUtil(int node, vector<bool> &visited) {
//         visited[node] = true;
//         cout << node << " ";
//         for (int neighbor : graph[node]) {
//             if (!visited[neighbor]) {
//                 dfsUtil(neighbor, visited);
//             }
//         }
//     }

//     void bfsUtil(queue<int> &q, vector<bool> &visited) {
//         if (q.empty()) return;

//         int node = q.front();
//         q.pop();
//         cout << node << " ";

//         for (int neighbor : graph[node]) {
//             if (!visited[neighbor]) {
//                 visited[neighbor] = true;
//                 q.push(neighbor);
//             }
//         }
//         bfsUtil(q, visited);
//     }


//     void bfsRecursive(int start) {
//         vector<bool> visited(v, false);
//         queue<int> q;

//         visited[start] = true;
//         q.push(start);

//         cout << "BFS (Recursive): ";
//         bfsUtil(q, visited);
//         cout << "\n";
//     }

//     void dfsRecursive(int start) {
//         vector<bool> visited(v, false);
//         cout << "DFS (Recursive): ";
//         dfsUtil(start, visited);
//         cout << "\n";
//     }
// };

// int main() {
//     InstagramGraph insta;
//     insta.makeConnections();

//     int start;
//     cout << "Enter starting user: ";
//     cin >> start;

//     insta.bfsRecursive(start);
//     insta.dfsRecursive(start);

//     return 0;
// }

// /*
// Example Testcase:-
//     Enter number of users (vertices): 8
//     Enter number of connections (edges): 9

//     Enter connections (u v) pairs:
//     Edge 1: 0 1
//     Edge 2: 0 2
//     Edge 3: 1 3
//     Edge 4: 1 4
//     Edge 5: 2 5
//     Edge 6: 2 6
//     Edge 7: 3 7
//     Edge 8: 4 7
//     Edge 9: 5 7

//     Enter starting user: 0
//     BFS (Recursive): 0 1 2 3 4 5 6 7 
//     DFS (Recursive): 0 1 3 7 4 5 2 6
// */