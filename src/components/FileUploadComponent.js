import React, { Component } from 'react';

export const Resize = (file, maxWidth, maxHeight, fn) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (event) {
        var dataUrl = event.target.result;

        var image = new Image();
        image.src = dataUrl;
        image.onload = function () {
            var resizedDataUrl = resizeImage(image, maxWidth, maxHeight, 0.7);
            fn(resizedDataUrl);
        };
    };
}

export function resizeImage(image, maxWidth, maxHeight, quality) {
    var canvas = document.createElement('canvas');

    var width = image.width;
    var height = image.height;

    if (width > height) {
        if (width > maxWidth) {
            height = Math.round(height * maxWidth / width);
            width = maxWidth;
        }
    } else {
        if (height > maxHeight) {
            width = Math.round(width * maxHeight / height);
            height = maxHeight;
        }
    }

    canvas.width = width;
    canvas.height = height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, width, height);
    return canvas.toDataURL("image/jpeg", quality);
}

export class ScalingUpload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataUrl: ''
        };
        this._onChange = this._onChange.bind(this);
    }

    _onChange(e) {
        var files = e.target.files;
        var self = this;
        var maxWidth = this.props.maxWidth;
        var maxHeight = this.props.maxHeight;
        Resize(files[0], maxWidth, maxHeight, function (resizedDataUrl) {
            self.setState({ dataUrl: resizedDataUrl });
        });
    }

    render() {
        let image;

        let dataUrl = this.state.dataUrl;
        if (dataUrl) {
            image = <img src={dataUrl} alt='Upload example' />
        }

        return <div>
            <input ref="upload" type="file" accept="image/*" onChange={this._onChange} />
            {image}
        </div>
    }
}

export default ScalingUpload;