import axios from "axios";

export class AsciiConverter {
  public static convertToAscii(text: string): void {
    const apiUrl = "https://www.texttoascii.com/api/figlet";
    // const style = "Gothic";
    const style = "Electronic";

    axios
      .post(apiUrl, { style, text })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}