import React from 'react'
import ReactDOM from 'react-dom'
import request from 'request'
import Dropzone from 'react-dropzone'
import Orthology from './orthology'
import { Dropdown, Embed, Segment, Input, Container, Divider, Header, Button, Image, Menu } from 'semantic-ui-react'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      currentPage: 0,
      file: '',
      email: '',
      dropText: 'Drop your FASTA file here or click here to browse file.',
      jbrowseUrl: 'http://localhost:7777/jbrowse/?data=data%2Fsample&loc=CP003193.1%3A6486..6987&tracks=DNA%2Cgff&highlight='
    }
    this.onDrop = this.onDrop.bind(this)
    this.onContinue = this.onContinue.bind(this)
  }

  onDrop(files) {
    this.setState({ file: files[0], dropText: 'File selected: ' + files[0].name.substring(0, 20) + ((files[0].name.length > 10) ? '...' : '') })
  }

  onContinue() {
    let formData = {
      file: this.state.file,
      email: this.state.email
    }
    request({
      method: 'POST',
      uri: 'http://localhost:3000/upload',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      multipart: {
        chunked: false,
        data: [
          {
            'Content-Disposition': `form-data; name="file"; filename=${this.state.file.name}`,
            body: this.state.file
          },
          {
            'Content-Disposition': 'form-data; name="email"',
            body: this.state.email
          },
        ]
      },
    }, (err, res, body) => {
      if (err) {
        return console.error('upload failed:', err);
      }
      console.log('Upload successful!  Server responded with:', body);
      this.setState({ currentPage: 1 })
    })
  }

  showPage() {
    if (this.state.currentPage === 0) {
      return (
        <Container style={{ paddingTop: 10 }} text>
          <Header as='h2'>Annotate</Header>
          <p>This is a genome browser for Staphylococcus aureus.</p>

          <Segment>
            <p>Upload an assembled staph genome as a FASTA file:</p>
            <Dropzone accept='.fna,.fa,fasta' onDropRejected={() => { alert("File not accepted.") }} multiple={false} maxSize={10242880} onDropAccepted={this.onDrop}>
              <p style={{ marginTop: 55, marginLeft: 25, marginRight: 25 }}>{this.state.dropText}</p>
            </Dropzone>
          </Segment>

          <Segment>
            <p>You will receive a url link to your annotated genome.</p>
            <Input onChange={(event) => { this.setState({ email: event.target.value }) }} placeholder='Your Email' />
          </Segment>
          <Button onClick={this.onContinue} primary>Continue</Button>
        </Container>
      )
    } else if (this.state.currentPage === 1) {
      return (
        <Container text>
          <p>You file is submitted and we'll send you an email when the processing is completed.</p>
        </Container>
      )
    } else if (this.state.currentPage === 2) {
      return (
        <Container style={{ paddingTop: 10 }} >
          <Segment>
            <p>Choose a Staph strain to display:</p>
            <Dropdown onChange={(event) => { this.setState({ jbrowseUrl: event.target.value }) }} placeholder='select strains' selection options={[{ key: 'strain1', value: 'strain1', text: 'Strain1' }, { key: 'strain2', value: 'strain2', text: 'Strain2' }, { key: 'strain3', value: 'strain3', text: 'Strain3' }]} />
          </Segment>
          <iframe style={{ border: 0, width: '100%', height: 600 }} src={this.state.jbrowseUrl}></iframe>
        </Container>
      )
    } else if (this.state.currentPage === 3) {
      return (
        <Container style={{ paddingTop: 15, width: '90%', overflow: 'scroll' }} >
          <Orthology />
        </Container>
      )
    } else if (this.state.currentPage === 4) {
      return (
        <Container text>
          <Header as='h2'>Methods</Header>
          <p>Methods</p>
        </Container>
      )
    } else if (this.state.currentPage === 5) {
      return (
        <Container text>
          <Header as='h2'>Community</Header>
          <p>Community</p>
        </Container>
      )
    } else if (this.state.currentPage === 6) {
      return (
        <Container text>
          <Header as='h2'>About</Header>
          <p>About</p>
        </Container>
      )
    }
  }

  render() {
    return (
      <div style={{ marginBottom: 30 }}>
        <Container style={{ paddingTop: 15 }}>
          {/** Header **/}
          <div style={{ display: 'flex', height: 50 }}>
            <Image style={{ height: 50, width: 50 }} src='images/grapes.png' />
            <Header as='h2' style={{ marginTop: 12, marginLeft: 10 }}>StaphBrowse</Header>
          </div>
        </Container>

        {/** Menu **/}
        <Segment style={{ borderRadius: 0, paddingLeft: 150 }} inverted color='blue'>
          <Menu color='blue' inverted secondary>
            <Menu.Item name='Annotate' active={this.state.currentPage === 0} onClick={() => { this.setState({ currentPage: 0 }) }} />
            <Menu.Item name='JBrowse' active={this.state.currentPage === 2} onClick={() => { this.setState({ currentPage: 2 }) }} />
            <Menu.Item name='Orthology' active={this.state.currentPage === 3} onClick={() => { this.setState({ currentPage: 3 }) }} />
            <Menu.Item name='Methods' active={this.state.currentPage === 4} onClick={() => { this.setState({ currentPage: 4 }) }} />
            <Menu.Item name='Community' active={this.state.currentPage === 5} onClick={() => { this.setState({ currentPage: 5 }) }} />
            <Menu.Item name='About' active={this.state.currentPage === 6} onClick={() => { this.setState({ currentPage: 6 }) }} />
          </Menu>
        </Segment>

        <div>
          {/** Page **/}
          {this.showPage()}
        </div>

      </div>
    )
  }
}