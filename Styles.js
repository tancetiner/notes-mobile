import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  notesView: {
    flex: 9,
    bottom: 10,
    padding: 10,
  },
  notes: {
    flex: 4,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  note: {
    backgroundColor: "#D1E1BC",
    width: "60%",
    alignItems: "center",
    padding: 5,
    margin: 8,
    borderRadius: 30,
    justifyContent: "center",
  },
  notesBackground: {
    flex: 1,
  },
  buttonView: {
    flex: 1,
    height: 30,
    width: "50%",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "orange",
    borderRadius: 30,
    margin: 5,
    bottom: 15,
    justifyContent: "center",
  },
  addNoteButton: {
    flex: 1,
    padding: 10,
    fontSize: 40,
  },
  addNoteButton2: {
    flex: 1,
    alignSelf: "flex-end",
    fontSize: 40,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
  },
  textInputStyle: {
    fontSize: 18,
  },
  addNoteBackground: {
    flex: 1,
    justifyContent: "center",
  },
  addNoteView: {
    backgroundColor: "#D1E1BC",
    width: "60%",
    height: "30%",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    bottom: 140,
    margin: 8,
    borderRadius: 30,
  },
});

export default styles;
