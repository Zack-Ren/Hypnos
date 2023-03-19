// To parse this JSON data, do
//
//     final diagnosticsModel = diagnosticsModelFromJson(jsonString);

import 'dart:convert';

DiagnosticsModel diagnosticsModelFromJson(String str) =>
    DiagnosticsModel.fromJson(json.decode(str));

String diagnosticsModelToJson(DiagnosticsModel data) =>
    json.encode(data.toJson());

class DiagnosticsModel {
  DiagnosticsModel({
    required this.id,
    required this.patientId,
    required this.dataAcquisitionStartTime,
    required this.dataAcquisitionEndTime,
    required this.accelerationX,
    required this.accelerationY,
    required this.accelerationZ,
    required this.angularAccelerationX,
    required this.angularAccelerationY,
    required this.angularAccelerationZ,
  });

  String id;
  String patientId;
  DateTime dataAcquisitionStartTime;
  DateTime dataAcquisitionEndTime;
  List<num> accelerationX;
  List<num> accelerationY;
  List<num> accelerationZ;
  List<num> angularAccelerationX;
  List<num> angularAccelerationY;
  List<num> angularAccelerationZ;

  factory DiagnosticsModel.fromJson(Map<String, dynamic> json) =>
      DiagnosticsModel(
        id: json["id"],
        patientId: json["patientId"],
        dataAcquisitionStartTime:
            DateTime.parse(json["dataAcquisitionStartTime"]),
        dataAcquisitionEndTime: DateTime.parse(json["dataAcquisitionEndTime"]),
        accelerationX: List<num>.from(json["accelerationX"].map((x) => x)),
        accelerationY: List<num>.from(json["accelerationY"].map((x) => x)),
        accelerationZ: List<num>.from(json["accelerationZ"].map((x) => x)),
        angularAccelerationX:
            List<num>.from(json["angularAccelerationX"].map((x) => x)),
        angularAccelerationY:
            List<num>.from(json["angularAccelerationY"].map((x) => x)),
        angularAccelerationZ:
            List<num>.from(json["angularAccelerationZ"].map((x) => x)),
      );

  Map<String, dynamic> toJson() => {
        "id": id,
        "patientId": patientId,
        "dataAcquisitionStartTime": dataAcquisitionStartTime.toIso8601String(),
        "dataAcquisitionEndTime": dataAcquisitionEndTime.toIso8601String(),
        "accelerationX": List<dynamic>.from(accelerationX.map((x) => x)),
        "accelerationY": List<dynamic>.from(accelerationY.map((x) => x)),
        "accelerationZ": List<dynamic>.from(accelerationZ.map((x) => x)),
        "angularAccelerationX":
            List<dynamic>.from(angularAccelerationX.map((x) => x)),
        "angularAccelerationY":
            List<dynamic>.from(angularAccelerationY.map((x) => x)),
        "angularAccelerationZ":
            List<dynamic>.from(angularAccelerationZ.map((x) => x)),
      };
}
