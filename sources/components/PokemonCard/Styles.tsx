import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 10,
    padding: 20,
    backgroundColor: "#1f1f1f",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  numberContainer: {
    width: 55,
    height: 30,
    borderRadius: 8,
    backgroundColor: "slategray",
    justifyContent: "center",
    alignItems: "center",
  },
  number: {
    fontSize: 13,
    fontWeight: "bold",
    color: "ghostwhite",
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    letterSpacing: 0.5,
    marginTop: 6,
  },
});
