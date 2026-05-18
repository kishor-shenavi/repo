// #include <iostream>
// #include <vector>
// #include <climits>

// using namespace std;

// int findMinDistance(vector<int>& dist, vector<bool>& visited) {

//     int min = INT_MAX;
//     int minIndex = -1;

//     for (int i = 0; i < dist.size(); i++) {

//         if (!visited[i] && dist[i] < min) {
//             min = dist[i];
//             minIndex = i;
//         }
//     }

//     return minIndex;
// }

// void dijkstra(vector<vector<int>>& graph, int source) {

//     int V = graph.size();

//     vector<int> dist(V, INT_MAX);
//     vector<bool> visited(V, false);

//     dist[source] = 0;

//     for (int count = 0; count < V - 1; count++) {

//         int u = findMinDistance(dist, visited);

//         visited[u] = true;

//         for (int v = 0; v < V; v++) {

//             if (!visited[v] &&
//                 graph[u][v] &&
//                 dist[u] != INT_MAX &&
//                 dist[u] + graph[u][v] < dist[v]) {

//                 dist[v] = dist[u] + graph[u][v];
//             }
//         }
//     }

//     cout << "Vertex\tDistance from Source\n";

//     for (int i = 0; i < V; i++) {
//         cout << i << "\t" << dist[i] << endl;
//     }
// }

// int main() {

//     vector<vector<int>> graph = {
//         {0, 4, 0, 0, 0, 0, 0, 8, 0},
//         {4, 0, 8, 0, 0, 0, 0, 11, 0},
//         {0, 8, 0, 7, 0, 4, 0, 0, 2},
//         {0, 0, 7, 0, 9, 14, 0, 0, 0},
//         {0, 0, 0, 9, 0, 10, 0, 0, 0},
//         {0, 0, 4, 14, 10, 0, 2, 0, 0},
//         {0, 0, 0, 0, 0, 2, 0, 1, 6},
//         {8, 11, 0, 0, 0, 0, 1, 0, 7},
//         {0, 0, 2, 0, 0, 0, 6, 7, 0}
//     };

//     dijkstra(graph, 0);

//     return 0;
// }