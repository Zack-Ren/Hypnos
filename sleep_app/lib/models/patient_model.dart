// To parse this JSON data, do
//
//     final patientModel = patientModelFromJson(jsonString);

import 'dart:convert';

PatientModel patientModelFromJson(String str) =>
    PatientModel.fromJson(json.decode(str));

String patientModelToJson(PatientModel data) => json.encode(data.toJson());

class PatientModel {
  PatientModel({
    required this.id,
    required this.username,
    required this.password,
    required this.name,
    required this.phoneNumber,
    required this.email,
    required this.doctorId,
  });

  String id;
  String username;
  String password;
  String name;
  int phoneNumber;
  String email;
  String doctorId;

  Future<String> getDoctorId() async {
    return doctorId;
  }

  factory PatientModel.fromJson(Map<String, dynamic> json) => PatientModel(
        id: json["id"],
        username: json["username"],
        password: json["password"],
        name: json["name"],
        phoneNumber: json["phoneNumber"],
        email: json["email"],
        doctorId: json["doctorId"],
      );

  Map<String, dynamic> toJson() => {
        "id": id,
        "username": username,
        "password": password,
        "name": name,
        "phoneNumber": phoneNumber,
        "email": email,
        "doctorId": doctorId,
      };
}
