import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginVertical: 15,
  },
  numberContainer: {
    width: 55,
    height: 30,
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
  nameContainer: {
    justifyContent: "center",
    alignItems:   "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  detailContainer: {
    width: "100%",
    marginVertical: 10,
    padding: 15,
    backgroundColor: "#2f2f2f",
    borderRadius: 10,
  },
  abilitiesContainer: {
    width: "100%",
    borderRadius: 8,
    padding: 10,
  },
  typesContainer: {
    width: "100%",
    borderRadius: 8,
    padding: 10,
    marginVertical: 7,
  },
  botContainer: {
    width: "100%",
    marginVertical: 5,
    padding: 10,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#3e3e3e",
    elevation: 3,
  },
  titleBot: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  subTitleBot: {
    fontSize: 13,
    color: "white",
    fontWeight: "600",
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: '#3e3e3e',
    borderRadius  : 10,
    elevation: 3,
  },
  statColumn: {
    flexBasis: "45%",
    marginVertical: 13,
    marginHorizontal: 3,
  },
  statName: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
  },
  statValue: {
    fontSize: 13,
    color: "white",
  },

});
