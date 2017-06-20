import React from 'react'
import ReactDOM from 'react-dom'
import Dropzone from 'react-dropzone'
import { Dropdown, Embed, Segment, Input, Container, Divider, Header, Button, Image, Menu } from 'semantic-ui-react'

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
    this.setState({ dropText: 'File selected: ' + files[0].name.substring(0, 20) + ((files[0].name.length > 10) ? '...' : '') })
  }

  onContinue() {
    this.setState({ currentPage: 1 })
  }

  showPage() {
    if (this.state.currentPage === 0) {
      return (
        <Container style={{ paddingTop: 15 }} text>
          <Header as='h2'>Upload</Header>
          <p>This is a genome browser for Staphylococcus aureus.</p>

          <Segment>
          <p>Choose a Staph strain to display:</p>
          <Dropdown placeholder='select strains' selection options={[{key:'strain1', value:'strain1', text:'Strain1'}, {key:'strain2', value:'strain2', text:'Strain2'}, {key:'strain3', value:'strain3', text:'Strain3'}]} />
          </Segment>

          <Segment>
          <p>Upload an assembled staph genome as a FASTA file:</p>
          <Dropzone onDropRejected={() => { alert("File not accepted.") }} multiple={false} maxSize={10242880} onDropAccepted={this.onDrop}>
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
        <div style={{ width: '100%', height: 600 }}>
          <iframe style={{ border: 0, width: '100%', height: 600 }} src='http://localhost:7777/jbrowse/?data=sample_data%2Fjson%2Fvolvox&loc=ctgA%3A1..10366&tracks=DNA&highlight='></iframe>
        </div>
      )
    } else if (this.state.currentPage === 2) {
      return (
        <Container text>
          <Header as='h2'>Orthology</Header>
          <p>Orthology</p>
        </Container>
      )
    } else if (this.state.currentPage === 3) {
      return (
        <Container text>
          <Header as='h2'>Methods</Header>
          <p>Methods</p>
        </Container>
      )
    } else if (this.state.currentPage === 4) {
      return (
        <Container text>
          <Header as='h2'>Community</Header>
          <p>Community</p>
        </Container>
      )
    } else if (this.state.currentPage === 5) {
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
      <div style={{marginBottom: 30}}>
        <div style={{ paddingTop: 15, paddingLeft: 20 }}>
          {/** Header **/}
          <div style={{ display: 'flex', height: 50 }}>
            <Image style={{ height: 50, width: 50 }} src='images/grapes.png' />
            <Header as='h2' style={{ marginTop: 12, marginLeft: 10 }}>StaphBrowse</Header>
          </div>
        </div>

        {/** Menu **/}
        <Menu style={{ borderRadius: 0, paddingLeft: 125 }} color='blue' inverted>
          <Menu.Item name='Upload' active={this.state.currentPage === 0} onClick={() => { this.setState({ currentPage: 0 }) }} />
          <Menu.Item name='Orthology' active={this.state.currentPage === 2} onClick={() => { this.setState({ currentPage: 2 }) }} />
          <Menu.Item name='Methods' active={this.state.currentPage === 3} onClick={() => { this.setState({ currentPage: 3 }) }} />
          <Menu.Item name='Community' active={this.state.currentPage === 4} onClick={() => { this.setState({ currentPage: 4 }) }} />
          <Menu.Item name='About' active={this.state.currentPage === 5} onClick={() => { this.setState({ currentPage: 5 }) }} />
        </Menu>

        <div>
          {/** Page **/}
          {this.showPage()}
        </div>

      </div>
    )
  }
}