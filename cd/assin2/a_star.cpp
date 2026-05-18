


#include <iostream>
#include <queue>
#include <vector>
#include <cmath>
#include <algorithm>

using namespace std;

class Node {

public:
    int x, y;
    int g, h, f;

    Node* parent;

    // Constructor
    Node(int x, int y, int g, int h, Node* parent = nullptr) {

        this->x = x;
        this->y = y;
        this->g = g;
        this->h = h;

        f = g + h;

        this->parent = parent;
    }
};

// Comparator for priority queue
class Compare {

public:
    bool operator()(Node* a, Node* b) {

        return a->f > b->f;
    }
};

// Manhattan Distance Heuristic
int heuristic(int x1, int y1, int x2, int y2) {

    return abs(x1 - x2) + abs(y1 - y2);
}

int main() {

    const int ROW = 5;
    const int COL = 5;

    // 0 = free path
    // 1 = obstacle

    int grid[ROW][COL] = {

        {0, 0, 0, 0, 0},
        {1, 1, 0, 1, 0},
        {0, 0, 0, 1, 0},
        {0, 1, 1, 0, 0},
        {0, 0, 0, 0, 0}
    };

    // Start Position
    int startX = 0;
    int startY = 0;

    // Goal Position
    int goalX = 4;
    int goalY = 4;

    priority_queue<Node*, vector<Node*>, Compare> openList;

    bool visited[ROW][COL] = {false};

    // Directions
    int dx[] = {-1, 1, 0, 0};
    int dy[] = {0, 0, -1, 1};

    Node* start = new Node(
        startX,
        startY,
        0,
        heuristic(startX, startY, goalX, goalY)
    );

    openList.push(start);

    Node* goalNode = nullptr;

    while (!openList.empty()) {

        Node* current = openList.top();

        openList.pop();

        int x = current->x;
        int y = current->y;

        if (visited[x][y])
            continue;

        visited[x][y] = true;

        // Goal Reached
        if (x == goalX && y == goalY) {

            goalNode = current;
            break;
        }

        // Explore Neighbors
        for (int i = 0; i < 4; i++) {

            int nx = x + dx[i];
            int ny = y + dy[i];

            // Valid Cell Check
            if (nx >= 0 && ny >= 0 &&
                nx < ROW && ny < COL &&
                grid[nx][ny] == 0 &&
                !visited[nx][ny]) {

                int newG = current->g + 1;

                int newH = heuristic(nx, ny, goalX, goalY);

                Node* neighbor = new Node(
                    nx,
                    ny,
                    newG,
                    newH,
                    current
                );

                openList.push(neighbor);
            }
        }
    }

    // Print Path
    if (goalNode == nullptr) {

        cout << "No Path Found\n";
    }
    else {

        vector<pair<int, int>> path;

        Node* temp = goalNode;

        while (temp != nullptr) {

            path.push_back({temp->x, temp->y});

            temp = temp->parent;
        }

        reverse(path.begin(), path.end());

        cout << "Path Found:\n";

        for (auto p : path) {

            cout << "(" << p.first << "," << p.second << ") ";
        }

        cout << endl;
    }

    return 0;
}












