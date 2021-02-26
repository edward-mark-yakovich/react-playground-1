# Space Jam!

The UI for the MachineQ platform.

## Installation

Using npm:

```shell
$ npm install
```

Alternatively, using yarn:

```shell
$ yarn
```

## Usage

Run local dev server (http://localhost:8080):

```shell
$ yarn dev
```

Run jest specs:

```shell
$ yarn tests
```

Run eslint:

```shell
$ yarn lint:js
```
## Config Secrets
1. Build desired environment in optimized mode
2. Base64 encode output env.js file in `dist` dir
  - e.g. from terminal `$ cat dist/env.js | base64`
3. Copy the output into a secrets.yaml file:
  ```yaml
    apiVersion: v1
    kind: Secret
    metadata:
      name: spacejam-dev-config
      namespace: default
    type: Opaque
    data:
      env.js: KHdpbmRvdy53ZWJwYWNrSnNvbnA9d2luZG93LndlYnBhY2tKc29ucHx8W10pLnB1c2goW1swXSx7ODk1OmZ1bmN0aW9uKHQsZSxzKXsidXNlIHN0cmljdCI7dmFyIG4sbz1zKDg5NyksYT0obj1vKSYmbi5fX2VzTW9kdWxlP246e2RlZmF1bHQ6bn07d2luZG93LmNvbmZpZz1hLmRlZmF1bHR9LDg5NzpmdW5jdGlvbih0K
  ```
4. Apply Secret to current kubernetes cluster (note: has to be done for each cluster)
  - e.g. `kubectl apply -f <path to yaml configuration>`
5. Update deployment file for the specific environment to point to this configuration
  - file can be found in the [mqcentral-kubernetes](https://github.com/machineq/mqcentral-kubernetes/blob/master/legacy-configurations/AKS/development/1.0/east/spacejam/deployment.yaml) repo
  - the relevant sections
    ```yaml
      volumeMounts:
        - name: spacejam-dev-config
          mountPath: /usr/share/nginx/html/env.js
          subPath: env.js
          readOnly: true
    ```
    ```yaml
      volumes:
        - name: spacejam-dev-config
          secret:
            secretName: spacejam-dev-config
    ```
6. Apply the deployment to current kubernetes cluster (note: has to be done for each cluster)
  - e.g. `kubectl apply -f <path to yaml configuration>`
