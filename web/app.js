import React from 'react'
import ReactDOM from 'react-dom'
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
      param: window.location.href.split('#')[1],
      dropText: 'Drop your FASTA file here or click here to browse file.',
      jbrowseUrl: 'http://localhost:7777/jbrowse/?data=data%2Fsample&loc=CP003193.1%3A6486..6987&tracks=DNA%2Cgff&highlight='
    }
    this.onDrop = this.onDrop.bind(this)
    this.onContinue = this.onContinue.bind(this)
  }

  componentDidMount() {
    if (this.state.param) {
      this.setState({ currentPage: 7 })
    }
  }

  onDrop(files) {
    this.setState({ file: files[0], dropText: 'File selected: ' + files[0].name.substring(0, 20) + ((files[0].name.length > 10) ? '...' : '') })
  }

  onContinue() {
    let fd = new FormData()
    fd.append("file", this.state.file)
    fd.append("email", this.state.email)
    let xhr = new XMLHttpRequest()
    xhr.open('POST', 'http://localhost:3000/upload', true)

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        let percentComplete = (e.loaded / e.total) * 100
        console.log(percentComplete + '% uploaded')
      }
    }
    xhr.onload = () => {
      if (xhr.status == 200) {
        console.log('Server got:', xhr.responseText)
        this.setState({ currentPage: 1 })
      }
    }
    xhr.send(fd)

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
          <Header as='h2'>Submitted</Header>
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
        <Container style={{ paddingTop: 10, width: '90%', overflow: 'scroll' }} >
          <Orthology />
        </Container>
      )
    } else if (this.state.currentPage === 4) {
      return (
        <Container style={{ paddingTop: 10 }} text>
          <Header as='h2'>Methods</Header>
          <p>Methods</p>
        </Container>
      )
    } else if (this.state.currentPage === 5) {
      return (
        <Container style={{ paddingTop: 10 }} text>
          <Header as='h2'>Community</Header>
          <p>Community</p>
        </Container>
      )
    } else if (this.state.currentPage === 6) {
      return (
        <Container style={{ paddingTop: 10 }} text>
          <Header as='h2'>About</Header>
          <Image style={{borderRadius: 5}} src='images/about.jpg' />
          <Segment>
            <p>Richard Copin, Ph.D.</p>
            <p><a href="mailto:richard.copin@nyumc.org">richard.copin@nyumc.org</a></p>
            <p>New York University School of Medicine</p>
            <p>430 east 29th street,</p>
            <p>Alexandrai West, 3rd floor,</p>
            <p>New York, NY, 10016</p>
          </Segment>
          <Segment>
            <p>Anbo Zhou</p>
            <p><a href="mailto:zhouanbo@gmail.com">zhouanbo@gmail.com</a></p>
            <p>Genetics Department</p>
            <p>Rutgers University</p>
            <p>57 US Highway 1, New Brunswick, NJ, 08901</p>
          </Segment>
          <Segment>
            <p>Jeffrey Vedanayagam</p>
            <p><a href="mailto:vedanayj@mskcc.org">vedanayj@mskcc.org</a></p>
            <p>Developmental Biology Program</p>
            <p>Sloan Kettering Institute</p>
            <p>430 E 67th Street, New York 10065</p>
          </Segment>
          <Segment>
            <p>Dmitry Brogun</p>
            <p>City University of New York</p>
          </Segment>
          <Segment>
            <p>Stuart Brown</p>
            <p><a href="mailto:stuart.brown@nyumc.org">stuart.brown@nyumc.org</a></p>
            <p>Sequencing Informatics Group</p>
            <p>Center for Health Informatics and Bioinformatics</p>
            <p>New York University</p>
            <p>227 E 30th Street, New York 10016</p>
          </Segment>
          <Segment>
            <p>Ben Busby</p>
            <p>National Center for Biotechnology Information</p>
          </Segment>
        </Container>
      )
    } else if (this.state.currentPage === 7) {
      return (
        <Container style={{ paddingTop: 10 }} text>
          <Header as='h2'>Result</Header>
          <Image src={'jobs/' + this.state.param + '/result.png'} />
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