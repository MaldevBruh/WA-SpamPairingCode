# WA (WhatsApp) Spam Pairing Code

This script uses the [Whiskeysockets/Baileys](https://github.com/whiskeysockets/baileys) library to spam pairing codes to a specified WhatsApp number. It connects to WhatsApp, sends a pairing code to the target number a specified number of times.

## Prerequisites

- Node.js (version 14 or later recommended)
- npm (Node Package Manager)
- Git
- A working internet connection

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/sudoBytez/WA-SpamPairingCode
   ```

3. **Navigate to your project directory**:

    ```bash
    cd WA-SpamPairingCode
    ```

4. **Install dependencies**:

    ```bash
    npm install
    ```

## Usage

1. **Run the script**:

    ```bash
    npm start
    ```

2. **Follow the prompts**:
    - Input the target WhatsApp number (in the format: 62823456789).
    - Input the amount of spam you want to send (recommended minimum is 100).

## How It Works

1. **Connect to WhatsApp**: The script uses `makeWASocket` to connect to WhatsApp and handle authentication.

2. **Handle User Input**: Prompts the user to enter the target number and the number of pairing codes to send.

3. **Send Pairing Codes**: Sends the specified number of pairing codes to the target number.

4. **Clean Up**: Deletes the session folder and exits after sending the pairing codes.

5. **Reconnect on Disconnection**: Automatically attempts to reconnect if the connection is lost.

## Note

- This script is intended for educational purposes. Be cautious when using it, as spamming might violate WhatsApp's terms of service.
- Make sure you have permission to use this script on the target number.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions, feel free to open an issue on the repository or contact the author at [simbey96@gmail.com](mailto:simbey96@gmail.com).

