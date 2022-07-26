import bgBody from "assets/img/background-boady-admin.png";

export const bgAdmin = {
  styles: {
    global: (props) => ({
      body: {
        bgImage: bgBody,
        bgSize: "cover",
        bgRepeat:"none",
        bgPosition: "center center",
      },
    }),
  },
};
