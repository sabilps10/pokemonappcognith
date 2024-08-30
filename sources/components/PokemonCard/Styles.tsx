import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    padding: 8,
    backgroundColor: "#1f1f1f",
    borderRadius: 10,
    elevation: 3,
  },
  numberContainer: {
    width: 55,
    height: 35,
    borderRadius: 8,
    backgroundColor: "#2f2f2f",
    justifyContent: "center",
    alignItems: "center",
  },
  number: {
    fontSize: 13,
    fontWeight: "bold",
    color: "ghostwhite",
  },
  detailContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  images: {
    width: 100, 
    height: 100,
    marginVertical: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: "400",
    color: "white",
    letterSpacing: 0.8,
    marginTop: 6,
  },
});
