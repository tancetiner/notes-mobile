import React, { useState } from "react";
import { View, TextInput, Button, ImageBackground, Alert } from "react-native";
import styles from "./Styles";

const AddNote = ({ route, navigation }) => {
  const [newNote, setNewNote] = useState("");
  const { notes } = route.params;

  const handleButton = () => {
    const found = notes.some((note) => note === newNote.trim());
    if (found) {
      Alert.alert("Error", "This note is already in the list!", [
        {
          text: "Back to Notes",
          onPress: () => navigation.navigate("Notes", { note: "" }),
        },
        {
          text: "Edit Note",
        },
      ]);
    } else {
      navigation.navigate("Notes", { note: newNote.trim() });
    }
  };

  return (
    <View style={styles.notesBackground}>
      <ImageBackground
        source={require("./assets/addNote.jpg")}
        style={styles.addNoteBackground}
      >
        <View style={styles.addNoteView}>
          <View
            style={{
              flex: 4,
              justifyContent: "center",
              marginLeft: 15,
              marginRight: 15,
              marginTop: 5,
            }}
          >
            <TextInput
              placeholder="Type here..."
              value={newNote}
              multiline={true}
              style={styles.textInputStyle}
              onChangeText={(note) => setNewNote(note)}
            />
          </View>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Button type="submit" title="Add Note" onPress={handleButton} />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default AddNote;
