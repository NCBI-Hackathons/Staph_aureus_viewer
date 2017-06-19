import React from 'react'
import ReactDOM from 'react-dom'
import Dropzone from 'react-dropzone'
import { Container, Divider, Header, Button, Image } from 'semantic-ui-react'

export default class App extends React.Component {
  constructor() {
    super()
    this.onDrop = this.onDrop.bind(this)
  }

  onDrop(files) {
    alert(files[0].size)
  }

  render() {
    return (
      <div>
        <div style={{ paddingTop: 15, paddingLeft: 20 }}>
          {/** Header **/}
          <div style={{ display: 'flex', height: 50 }}>
            <Image style={{ height: 50, width: 50 }} src='images/grapes.png' />
            <Header as='h2' style={{ marginTop: 12, marginLeft: 10 }}>StaphBrowse</Header>
          </div>
        </div>
        <Divider />

        {/** Intro **/}
        <Container text>
          <p>This is a genome browser for staphylococcus aureus.</p>
          <p>Upload an aligned staph genome as a FASTA file:</p>
          <Dropzone multiple={false} maxSize={5242880} onDrop={this.onDrop}>
            <p style={{ marginTop: 55, marginLeft: 25, marginRight: 25 }}>Drop your FASTA file here or click here to browse file.</p>
          </Dropzone>
          <Divider />
          <Button primary>Continue</Button>
        </Container>

      </div>
    )
  }
}