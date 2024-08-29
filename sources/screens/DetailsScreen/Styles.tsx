import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 300,
    height: 300,
    marginVertical: 16,
  },
  nameContainer: {
    justifyContent: "center",
    alignItems: "center",
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
  detailContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
  },
  abilitiesContainer: {
    width: '100%',
    backgroundColor: 'seagreen',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    padding: 10,
  },
  typesContainer: {
    width: '100%',
    backgroundColor: 'springgreen',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    padding: 10,
    marginVertical: 7,
  },
  statsContainer: {
    width: '100%',
    backgroundColor: 'teal',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  subTitleIn: {
    fontSize: 13,
    color: "white",
  },
});
