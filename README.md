# My React Flow App

This is a sample React application that demonstrates the usage of React Flow library.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository: `git clone https://github.com/VinayakSuthar/React-flow.git`
2. Install dependencies: `npm install`
3. Start the development server: `npm start`

## Features

- **Text Node**: Our flow builder currently supports only one type of message (i.e Text Message). There can be multiple Text Nodes in one flow. Nodes are added to the flow by dragging and dropping a Node from the Nodes Panel.
- **Nodes Panel**: This panel houses all kind of Nodes that our Flow Builder supports. Right now there is only Message Node, but we’d be adding more types of Nodes in the future so make this section extensible.
- **Edge**: Connects two Nodes together.
- **Source Handle**: Source of a connecting edge. Can only have one edge originating from a source handle.
- **Target Handle**: Target of a connecting edge. Can have more than one edge connecting to a target handle.
- **Settings Panel**: Settings Panel will replace the Nodes Panel when a Node is selected. It has a text field to edit text of the selected Text Node.
- **Save Button**: Button to save the flow. Save button press will show an error if there are more than one Nodes and more than one Node has empty target handles.

## Demo

You can find a live demo of this project [here](https://r-flow-builder.vercel.app/).

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.
