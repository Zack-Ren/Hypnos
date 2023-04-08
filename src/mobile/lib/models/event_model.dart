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
    required this.eventTime,
    required this.doctorNotes,
    required this.patientNotes,
    required this.setOfDiagnostics,
  });

  String id;
  String patientId;
  String doctorId;
  DateTime eventTime;
  String doctorNotes;
  String patientNotes;
  List<String> setOfDiagnostics;

  factory EventModel.fromJson(Map<String, dynamic> json) => EventModel(
        id: json["id"],
        patientId: json["patientId"],
        doctorId: json["doctorId"],
        eventTime: DateTime.parse(json["eventTime"]),
        doctorNotes: json["doctorNotes"],
        patientNotes: json["patientNotes"],
        setOfDiagnostics:
            List<String>.from(json["setOfDiagnostics"].map((x) => x)),
      );

  Map<String, dynamic> toJson() => {
        "id": id,
        "patientId": patientId,
        "doctorId": doctorId,
        "eventTime": eventTime.toIso8601String(),
        "doctorNotes": doctorNotes,
        "patientNotes": patientNotes,
        "setOfDiagnostics": List<dynamic>.from(setOfDiagnostics.map((x) => x)),
      };
}
