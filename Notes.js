import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ImageBackground,
  Alert,
  ScrollView,
  TouchableHighlight,
  Pressable,
} from "react-native";
import styles from "./Styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Notes = ({ navigation, route }) => {
  const [notes, setNotes] = useState([]);
  const [lastNote, setLastNote] = useState("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    // storeNotes([]).then(() => {
    //   getNotes().then(() => setLoading(false));
    // });
    getNotes().then(() => {
      if (notes === null) {
        storeNotes([]).then(() => {
          getNotes().then(() => {});
        });
      }
    });
  }, []);

  useEffect(() => {
    if (route.params?.note != lastNote && route.params?.note != "") {
      let note = route.params?.note;
      storeNotes(notes.concat(note));
      setLastNote(note);
    }
  }, [route.params?.note]);

  useEffect(() => {
    getNotes().then({});
  }, [refresh]);

  const storeNotes = async (noteList) => {
    await AsyncStorage.setItem("notes", JSON.stringify(noteList));
    setRefresh(!refresh);
  };

  const getNotes = async () => {
    const jsonValue = await AsyncStorage.getItem("notes");
    let notes = [];
    if (jsonValue !== null) {
      notes = JSON.parse(jsonValue);
    }
    setNotes(notes);
  };

  const deleteNote = async (noteText) => {
    const noteList = notes.filter((note) => note != noteText);
    storeNotes(noteList);
  };

  const noteTouchAlert = (note, idx) => {
    return () => {
      Alert.alert(`Note #${idx + 1}`, note, [
        {
          text: "Edit Note",
          onPress: () =>
            Alert.prompt(
              "Edit Note:",
              "",
              [
                {
                  text: "Cancel",
                  onPress: () => navigation.navigate("Notes", { note: "" }),
                },
                {
                  text: "Done!",
                  onPress: (txt) => {
                    const idx = notes.findIndex((noteTxt) => noteTxt === note);
                    const newNoteList = notes;
                    newNoteList[idx] = txt;
                    storeNotes(newNoteList);
                  },
                },
              ],
              "plain-text",
              note
            ),
        },
        {
          text: "Delete Note",
          onPress: () => deleteNote(note),
          style: "destructive",
        },
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => navigation.navigate("Notes", { note: "" }),
        },
      ]);
    };
  };

  if (notes === null)
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text
          style={{
            fontSize: 90,
          }}
        >
          Loading ...
        </Text>
      </View>
    );
  else
    return (
      <View style={styles.notesBackground}>
        <ImageBackground
          source={require("./assets/background.jpg")}
          style={styles.backgroundImage}
        >
          <View style={styles.notesView}>
            <ScrollView>
              <View style={styles.notes}>
                {notes.map((note, idx) => (
                  <TouchableHighlight
                    style={styles.note}
                    key={idx}
                    activeOpacity={0.6}
                    underlayColor="#F5F8DA"
                    onPress={noteTouchAlert(note, idx)}
                  >
                    <View key={idx}>
                      <Text key={idx} style={{ fontSize: 20, padding: 5 }}>
                        {note}
                      </Text>
                    </View>
                  </TouchableHighlight>
                ))}
              </View>
            </ScrollView>
          </View>
          <Pressable
            style={styles.buttonView}
            activeOpacity={0.2}
            underlayColor="#F5F8DA"
            onPress={() => navigation.navigate("AddNote", { notes: notes })}
          >
            <View>
              <Text
                style={{
                  color: "dodgerblue",
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                Add Note
              </Text>
            </View>
          </Pressable>
          {/* <Button
              title="Add Note"
              onPress={() => navigation.navigate("AddNote", { notes: notes })}
            /> */}
        </ImageBackground>
      </View>
    );
};

export default Notes;
