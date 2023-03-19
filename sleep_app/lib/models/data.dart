import 'package:flutter/cupertino.dart';

class DataModel extends ChangeNotifier {
  static String _id = "";
  static String _docId = "";

  static void setId(String id) {
    _id = id;
  }

  static void setDocId(String docId) {
    _docId = docId;
  }

  static String getId() {
    return _id;
  }

  static String getDocId() {
    return _docId;
  }
}
