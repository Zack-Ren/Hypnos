// To parse this JSON data, do
//
//     final eventModel = eventModelFromJson(jsonString);

import 'dart:convert';

EventModel eventModelFromJson(String str) =>
    EventModel.fromJson(json.decode(str));

String eventModelToJson(EventModel data) => json.encode(data.toJson());

class EventModel {
  EventModel({
    required this.id,
    required this.patientId,
    required this.doctorId,
    required this.doctorNotes,
    required this.patientNotes,
    required this.listOfDiagnostics,
  });

  String id;
  String patientId;
  String doctorId;
  String doctorNotes;
  String patientNotes;
  List<String> listOfDiagnostics;

  factory EventModel.fromJson(Map<String, dynamic> json) => EventModel(
        id: json["id"],
        patientId: json["patientId"],
        doctorId: json["doctorId"],
        doctorNotes: json["doctorNotes"],
        patientNotes: json["patientNotes"],
        listOfDiagnostics:
            List<String>.from(json["listOfDiagnostics"].map((x) => x)),
      );

  Map<String, dynamic> toJson() => {
        "id": id,
        "patientId": patientId,
        "doctorId": doctorId,
        "doctorNotes": doctorNotes,
        "patientNotes": patientNotes,
        "listOfDiagnostics":
            List<dynamic>.from(listOfDiagnostics.map((x) => x)),
      };
}
