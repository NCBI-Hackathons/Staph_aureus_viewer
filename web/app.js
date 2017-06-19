import React from 'react'
import ReactDOM from 'react-dom'
import Dropzone from 'react-dropzone'
import { Input, Container, Divider, Header, Button, Image, Menu } from 'semantic-ui-react'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      currentPage: 0,
      email: '',
      dropText: 'Drop your FASTA file here or click here to browse file.'
    }
    this.onDrop = this.onDrop.bind(this)
    this.onContinue = this.onContinue.bind(this)
  }

  onDrop(files) {
    this.setState({dropText: 'File selected: '+files[0].name.substring(0, 20)+((files[0].name.length>10)?'...':'')})
  }

  onContinue() {
    window.open('http://localhost:7777/jbrowse/?data=sample_data%2Fjson%2Fvolvox&loc=ctgA%3A1..10003&tracks=DNA&highlight=')
  }

  showPage() {
    if (this.state.currentPage === 0) {
      return (
        <Container text>
          <Header as='h2'>Upload</Header>
          <p>This is a genome browser for staphylococcus aureus.</p>
          <p>Upload an aligned staph genome as a FASTA file:</p>
          <Dropzone onDropRejected={()=>{alert("File not accepted.")}} multiple={false} maxSize={10242880} onDropAccepted={this.onDrop}>
            <p style={{ marginTop: 55, marginLeft: 25, marginRight: 25 }}>{this.state.dropText}</p>
          </Dropzone>
          <Input onChange={(event) => {this.setState({email: event.target.value})}} placeholder='Your Email' />
          <Button onClick={this.onContinue} style={{marginTop: 20, marginLeft: 15}} primary>Continue</Button>
        </Container>
      )
    } else if (this.state.currentPage === 1) {
      return (
        <Container text>
          <Header as='h2'>Orthology</Header>
          <p>Orthology</p>
        </Container>
      )
    } else if (this.state.currentPage === 2) {
      return (
        <Container text>
          <Header as='h2'>Methods</Header>
          <p>Methods</p>
        </Container>
      )
    } else if (this.state.currentPage === 3) {
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
      <div>
        <div style={{ paddingTop: 15, paddingLeft: 20 }}>
          {/** Header **/}
          <div style={{ display: 'flex', height: 50 }}>
            <Image style={{ height: 50, width: 50 }} src='images/grapes.png' />
            <Header as='h2' style={{ marginTop: 12, marginLeft: 10 }}>StaphBrowse</Header>
          </div>
        </div>

        <Divider />

        <Container>
          {/** Menu **/}
          <Menu style={{float: 'left'}} pointing secondary vertical>
            <Menu.Item name='Upload' active={this.state.currentPage === 0} onClick={() => { this.setState({ currentPage: 0 }) }} />
            <Menu.Item name='Orthology' active={this.state.currentPage === 1} onClick={() => { this.setState({ currentPage: 1 }) }} />
            <Menu.Item name='Methods' active={this.state.currentPage === 2} onClick={() => { this.setState({ currentPage: 2 }) }} />
            <Menu.Item name='About' active={this.state.currentPage === 3} onClick={() => { this.setState({ currentPage: 3 }) }} />
          </Menu>

          {/** Page **/}
          <Container style={{float: 'left', width: '70%', paddingLeft: 30, paddingTop: 15}}>
            {this.showPage()}
          </Container>
        </Container>

      </div>
    )
  }
}