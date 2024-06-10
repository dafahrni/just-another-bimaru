export var MessageType;
(function (MessageType) {
    MessageType[MessageType["NewGame"] = 0] = "NewGame";
    MessageType[MessageType["ChangeCell"] = 1] = "ChangeCell";
    MessageType[MessageType["ChangeValue"] = 2] = "ChangeValue";
    MessageType[MessageType["SizeChanged"] = 3] = "SizeChanged";
    MessageType[MessageType["ShipChanged"] = 4] = "ShipChanged";
    MessageType[MessageType["TileChanged"] = 5] = "TileChanged";
    MessageType[MessageType["LabelChanged"] = 6] = "LabelChanged";
})(MessageType || (MessageType = {}));
//# sourceMappingURL=message-type.js.map